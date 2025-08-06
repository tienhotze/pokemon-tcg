import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #333;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  }
`;

export const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

export const CardInfo = styled.div`
  margin: 20px 0;
  color: #fff;

  p {
    margin: 5px 0;
    font-size: 16px;
  }
`;

export const AddButton = styled.button`
  background-color: #FFCB05;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e6b804;
    box-shadow: 0 0 10px rgba(255, 203, 5, 0.5);
  }
`;
