import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

import './Menu.css';
import GameID from '../consts/shema';
import getGameSets from '../google/drive/set';
import {GAME} from '../consts/urls';
import {getNextGameId} from '../google/sheets/game';

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

export default function Menu() {
  const navigate = useNavigate();
  const [isNewGame, setIsNewGame] = useState(undefined);
  const [gameID, setGameID] = useState('');
  const [gameIDIsValid, setGameIDIsValid] = useState(false);

  const handleGameIDChange = (event) => {
    setGameID(event.target.value);
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
    navigate(GAME, {
      state: {game: gameID, isNew: false},
    });
  };

  const handleGameSetSelection = (selectedSet) => {
    navigate(GAME, {
      state: {set: selectedSet.id, game: gameID, isNew: isNewGame},
    });
  };

  return (
    <div className='overlay'>
      <section className='menu-body col-lg-4 col-md-4 col-sm-6 col-xs-12'>
        {isNewGame ?
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
