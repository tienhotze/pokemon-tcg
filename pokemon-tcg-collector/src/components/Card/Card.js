import React from 'react';
import { CardContainer, CardImage, CardInfo, AddButton } from './Card.styles';

const Card = ({ cardData, isCollected, onToggle }) => {
  if (!cardData) {
    return (
      <CardContainer>
        <p>Error: Card data not available</p>
      </CardContainer>
    );
  }

  const { name, number, rarity, images } = cardData;

  return (
    <CardContainer>
      <CardImage src={`/images/${encodeURIComponent(images.small)}`} alt={name} />
      <CardInfo>
        <p>{name} {number}</p>
        <p>{rarity}</p>
      </CardInfo>
      <AddButton onClick={() => onToggle(cardData.id)}>
        {isCollected ? '✓ Added' : '+ Add to Collection'}
      </AddButton>
    </CardContainer>
  );
};

export default Card;
