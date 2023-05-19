import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import loadingImage from '../images/loading.jpg';
import selectIcon from '../images/check-icon.png';
import crossIcon from '../images/cross-icon.png';
import removePlaceholder from '../images/cross-placeholder.png';
import {ProcessContext} from '../context/ProcessContext';
import {fetchImage} from '../services/images';

export default function GameCard({gameID, setID, cardID, selectCard}) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCrossed, setIsCrossed] = useState(false);
  const {
    userSelect,
    currentSelectedCard,
    setCurrentSelectedCard,
  } = useContext(ProcessContext);

  useEffect(() => {
    fetchImage(setID, cardID, setImage, setLoading);
  }, []);

  const onCardClick = () => {
    if (!userSelect) {
      setCurrentSelectedCard((prev) => prev === cardID ? undefined : cardID);
    }
  };

  const onCardSelectClick = () => {
    setCurrentSelectedCard((prev) => prev === cardID ? undefined : cardID);
    setIsCrossed(false);
  };

  const onCardCrossClick = () => {
    setIsCrossed((prev) => !prev);
    setCurrentSelectedCard((prev) => prev === cardID ? undefined : prev);
  };

  return (
    <article
      className={
        `game-card col-lg-2 col-md-2 col-sm-2 col-xs-5 
        ${currentSelectedCard === cardID ? 'selected' : ''} 
        ${isCrossed ? 'crossed' : ''}
        `
      }
      onClick={onCardClick}
    >
      <div className='card-cover'>
        <div className='card-front'>
          <img
            className='card-image'
            src={loading ? loadingImage : image}
            alt='card'
          />
          <img className='card-image-placeholder'
            src={removePlaceholder} alt='cross'
          />
          <h4 className='card-content'>Content</h4>
        </div>
        {userSelect && <div className='card-back'>
          <button className='icon-button' onClick={onCardCrossClick}>
            <img src={crossIcon} alt='Remove card'/>
          </button>
          <button className='icon-button' onClick={onCardSelectClick}>
            <img src={selectIcon} alt='Select card'/>
          </button>
        </div>}
      </div>
    </article>
  );
}

GameCard.propTypes = {
  gameID: PropTypes.string.isRequired,
  setID: PropTypes.number.isRequired,
  cardID: PropTypes.number.isRequired,
  selectCard: PropTypes.func.isRequired,
};
