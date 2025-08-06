import React from 'react';
import { CardContainer, CardInfo, AddButton } from './Card.styles';

const Card = ({ cardData, isCollected, onToggle }) => {
  if (!cardData) {
    return (
      <CardContainer>
        <p>Error: Card data not available</p>
      </CardContainer>
    );
  }

  const { name, number, rarity } = cardData;

  return (
    <CardContainer>
      {cardData.images && cardData.images.small && (
        <img 
          src={`/${cardData.images.small}`} 
          alt={name} 
          style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
        />
      )}
      <CardInfo>
        <h3>{name}</h3>
        <p>#{number} | {rarity}</p>
      </CardInfo>
      <AddButton onClick={() => onToggle(cardData.id)}>
        {isCollected ? '✓ Collected' : '+ Add to Collection'}
      </AddButton>
    </CardContainer>
  );
};

export default Card;
