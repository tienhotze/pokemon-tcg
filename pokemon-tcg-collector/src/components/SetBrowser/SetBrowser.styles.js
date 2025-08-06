import styled from 'styled-components';

export const BrowserContainer = styled.div`
  padding: 20px;
  background-color: #222;
  border-right: 1px solid #333;
`;

export const SeriesTitle = styled.h3`
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: bold;
  margin-top: 0;
  color: #FFCB05;
`;

export const SetList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SetItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${props => 
    props.$disabled ? '#444' : 
    props.$active ? '#f56565' : 'transparent'};
  color: ${props => 
    props.$disabled ? '#888' : 
    props.$active ? '#fff' : '#fff'};
  pointer-events: ${props => (props.$disabled ? 'none' : 'auto')};
  border-radius: 20px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};

  &:hover {
    background-color: ${props => 
      props.$disabled ? '#444' : 
      props.$active ? '#f56565' : '#333'};
  }
`;
