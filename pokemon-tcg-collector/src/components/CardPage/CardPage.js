import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseSetCards } from '../../data/base_set_cards';
import Card from '../Card/Card';
import { BackButton } from './CardPage.styles';

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = baseSetCards.find(c => c.id === id);

  return (
    <div>
      <BackButton onClick={() => navigate(-1)}>← Back to Collection</BackButton>
      {card ? <Card cardData={card} /> : <p>Card not found</p>}
    </div>
  );
};

export default CardPage;
