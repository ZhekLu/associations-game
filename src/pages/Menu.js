import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './Menu.css';
import GameID from '../consts/shema';
import {GameContext} from '../context/GameContext';
import {getUser} from '../google/auth/user';
import getGameSets from '../google/drive/set';
import {addGame, getNextGameId} from '../google/sheets/game';
import getGames from '../google/sheets/store';
import Loading from './Loading';
import Game from './Game';

const SelectSet = ({onSetSelection}) => {
  const [gameSets, setGameSets] = useState([]);
  useEffect(() => {
    getGameSets().then((data) => {
      setGameSets(data);
    });
  }, []);
  return (
    <>
      <h1>Select Set</h1>
      <div className='select-set'>
        {
          gameSets.map((set) => (
            <button
              value={set.id}
              className='select-set-button'
              onClick={() => onSetSelection(set)}
              key={set.id}
            >{set.name}
            </button>
          ))
        }
      </div>
    </>
  );
};

SelectSet.propTypes = {
  onSetSelection: PropTypes.func.isRequired,
};

const SelectOption = ({
  handleNewGameClick,
  handleJoinGameClick,
  handleGameIDChange,
  disableJoinButton,
}) => {
  return (<>
    <h1>Select option</h1>
    <button
      className='menu-button'
      onClick={handleNewGameClick}
    > New Game
    </button>
    <h1>Or</h1>
    <button
      className='menu-button'
      onClick={handleJoinGameClick}
      disabled={disableJoinButton}
    > Join Game
    </button>
    <input
      type='text'
      onChange={handleGameIDChange}
      placeholder='Game ID'
      pattern={GameID.pattern}
      minLength={GameID.minLength}
      maxLength={GameID.maxLength}
    />
  </>);
};

SelectOption.propTypes = {
  handleNewGameClick: PropTypes.func.isRequired,
  handleJoinGameClick: PropTypes.func.isRequired,
  handleGameIDChange: PropTypes.func.isRequired,
  disableJoinButton: PropTypes.bool,
};

const GameDoesNotExists = ({gameID, setReady}) => {
  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        <h1>Ooops</h1>
        <p className='menu-body-text'>
                    It seems like game &quot;{gameID}&quot; does not exist
        </p>
        <button
          className='menu-button'
          onClick={() => setReady(false)}
        > Back to menu
        </button>
      </section>
    </div>
  );
};

GameDoesNotExists.propTypes = {
  gameID: PropTypes.string.isRequired,
  setReady: PropTypes.func.isRequired,
};

export default function Menu() {
  const [gameCreated, setGameCreated] = useState(false);
  const [gameIDIsValid, setGameIDIsValid] = useState(false);
  const [games, setGames] = useState({});
  const [ready, setReady] = useState(false);
  const [gameIsLoaded, setGameIsLoaded] = useState(false);

  const {
    gameID, setGameID,
    gameSet, setGameSet,
    gameInfo, setGameInfo,
  } = useContext(GameContext);

  const setIsNewGame = (value) => {
    setGameInfo((prev) => ({
      ...prev,
      isNew: value,
      isCurrentUserOwner: value,
    }));
  };

  const handleGameIDChange = (event) => {
    setGameID(event.target.value.toUpperCase());
    const validityState = event.target.validity;
    const isOnlyPatternInvalid = validityState.patternMismatch &&
            !validityState.tooLong &&
            !validityState.tooShort;
    event.target.setCustomValidity(isOnlyPatternInvalid ?
            'Game ID should contains only digits or letters' :
            '',
    );
    if (validityState.valid) {
      setGameIDIsValid(true);
    }
  };
  const handleNewGameClick = (event) => {
    setIsNewGame(true);
    getNextGameId().then((data) => setGameID(data));
  };
  const handleJoinGameClick = (event) => {
    setIsNewGame(false);
    getGames().then((data) => {
      setGames(data);
    });
    setReady(true);
  };

  const handleGameSetSelection = (selectedSet) => {
    setGameSet(selectedSet.id);
    setReady(true);
  };

  useEffect(() => {
    if (ready && gameInfo.isNew && !gameCreated) {
      const user = getUser();
      addGame(gameID, user.email, gameSet).then((added) => {
        if (added) {
          console.log('New game created!', gameID);
          setGameCreated(true);
        } else {
          console.log('Game not added. Something went wrong...');
        }
      });
    }
  }, [ready, gameInfo.isNew]);

  useEffect(() => {
    if (games && games[gameID]) {
      const game = games[gameID];
      setGameSet(game.image_set);
      setGameInfo((prev) => ({
        ...prev,
        isExists: true,
        user_1: game.user_1,
        user_2: game.user_2,
        select_1: game.select_1,
        select_2: game.select_2,
      }));
      setGameIsLoaded(true);
    }
  }, [games, ready]);

  if (ready) {
    if (
      (!gameInfo.isNew &&
                (!games || !Object.keys(games).length || !gameIsLoaded)) ||
            (gameInfo.isNew && !gameCreated)
    ) {
      return <Loading/>;
    }
    if (gameInfo.isNew || games[gameID]) {
      return <Game/>;
    }
    console.log('::not_found::',
        {
          'info': gameInfo,
          'created': gameCreated,
          'games': games, 'id': gameID,
        },
    );
    return <GameDoesNotExists gameID={gameID} setReady={setReady}/>;
  }

  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        {gameInfo.isNew ?
                    <SelectSet onSetSelection={handleGameSetSelection}/> :
                    <SelectOption
                      handleGameIDChange={handleGameIDChange}
                      handleNewGameClick={handleNewGameClick}
                      handleJoinGameClick={handleJoinGameClick}
                      disableJoinButton={!gameIDIsValid}
                    />}
      </section>
    </div>
  );
}
