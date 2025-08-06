import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import { GridContainer, BackButton } from './CardGrid.styles';

const CardGrid = ({ cards, collection, onToggleCard }) => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const filteredCards = cards.filter(card => card.set.id === setId);

  return (
    <>
      <BackButton onClick={() => navigate('/')}>← Back to Set Browser</BackButton>
      <GridContainer>
        {filteredCards.map(card => (
          <Card
            key={card.id}
            cardData={card}
            isCollected={!!collection[card.id]}
            onToggle={onToggleCard}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default CardGrid;
