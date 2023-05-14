import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import GameID from '../consts/shema';
import getGameSets from '../google/drive/set';

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
      disabled={true}
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
};

export default function Menu() {
  const [isNewGame, setIsNewGame] = useState(undefined);
  const [gameID, setGameID] = useState(undefined);
  const [gameSet, setGameSet] = useState(undefined);

  const handleGameIDChange = (event) => {
    const validityState = event.target.validity;
    const isOnlyPatternInvalid = validityState.patternMismatch &&
            !validityState.tooLong &&
            !validityState.tooShort;
    event.target.setCustomValidity(isOnlyPatternInvalid ?
            'Game ID should contains only digits or letters' :
            '',
    );
    if (validityState.valid) {
      setGameID(event.target.value);
    }
  };
  const handleNewGameClick = (event) => {
    setIsNewGame(true);
  };
  const handleJoinGameClick = (event) => {
    setIsNewGame(false);
  };

  const handleGameSetSelection = (selectedSet) => {
    setGameSet(selectedSet);
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
                    />}
      </section>
    </div>
  );
}
