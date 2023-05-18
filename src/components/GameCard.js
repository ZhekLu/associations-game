import React, {useEffect, useState} from 'react';
import loadingImage from '../images/loading.jpg';
import selectIcon from '../images/check-icon.png';
import crossIcon from '../images/cross-icon.png';
import removePlaceholder from '../images/cross-placeholder.png';
import PropTypes from 'prop-types';

export default function GameCard({gameID, setID, cardID, selectCard}) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../gamesets/${setID}/img_${cardID}.jpg`);
        setImage(response.default);
      } catch (err) {
        console.log('Error while loading picture:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);

  return (
    <article className='game-card col-lg-2 col-md-2 col-sm-2 col-xs-5'>
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
        <div className='card-back'>
          <button className='icon-button'>
            <img src={crossIcon} alt='Remove card'/>
          </button>
          <button className='icon-button' onClick={() => selectCard(cardID)}>
            <img src={selectIcon} alt='Select card'/>
          </button>
        </div>
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
