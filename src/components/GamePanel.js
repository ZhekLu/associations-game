import React, {useContext, useEffect, useState} from 'react';
import Logo from './Logo';
import notSelectedPicture from '../images/unknown.jpg';
import copyIcon from '../images/copy-icon.png';
import selectIcon from '../images/select-icon.png';
import {GameContext} from '../context/GameContext';
import {ProcessContext} from '../context/ProcessContext';
import {fetchImage} from '../services/images';

export default function GamePanel() {
  const {gameID, gameSet, gameInfo, setGameInfo} = useContext(GameContext);
  const {currentSelectedCard, setCurrentSelectedCard, userSelect, setUserSelect} = useContext(ProcessContext);
  const [currentImage, setCurrentImage] = useState('');
  const [currentImageLoading, setCurrentImageLoading] = useState(true);

  useEffect(() => {
    if (!userSelect) {
      if (!currentSelectedCard) {
        setCurrentImage('');
      } else {
        fetchImage(gameSet, currentSelectedCard, setCurrentImage, setCurrentImageLoading);
      }
    }
  }, [currentSelectedCard]);

  const onSelectClicked = () => {
    if (!userSelect) {
      const selectedInfo = {};
      if (gameInfo.isCurrentUserOwner) {
        selectedInfo.select_1 = currentSelectedCard;
      } else {
        selectedInfo.select_2 = currentSelectedCard;
      }
      setGameInfo((prev) => ({
        ...prev,
        ...selectedInfo,
      }));
      setUserSelect(true);
      setCurrentSelectedCard(undefined);
    } else {
      // todo! check if win
    }
  };

  return (
    <nav className='panel col-lg-3 col-md-3 col-sm-12 col-xs-12'>
      <Logo/>

      {/* Selected card view*/}
      <article
        className='game-card selected col-lg-6 col-md-6 col-sm-2'
      >
        <img className='card-image'
          src={currentImage && !currentImageLoading ? currentImage : notSelectedPicture}
          alt='selected-card'
        />
        <h4 className='card-content'>Your Choice</h4>
      </article>

      {/* Control buttons*/}
      <section className='panel-buttons col-lg-6 col-md-6 col-sm-3 col-xs-3'>
        <button
          className='icon-button'
          onClick={() => {
            navigator.clipboard.writeText(gameID)
                .then(() => console.log('Copied!'));
          }}>
          <img src={copyIcon} alt='copy'/>
        </button>
        <button
          className='icon-button'
          disabled={!currentSelectedCard}
          onClick={onSelectClicked}>
          <img src={selectIcon} alt='select'/>
        </button>
      </section>

      {/* Game code*/}
      <section className='game-code col-lg-6 col-md-6 col-sm-3 col-xs-3'>
        <code>{gameID}</code>
      </section>
    </nav>
  );
}
