import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #111;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
`;

export const Logo = styled.h1`
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 28px;
  margin: 0;
  color: #FFCB05;
  text-shadow: 2px 2px 4px #000;
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #FFCB05;
    box-shadow: 0 0 10px rgba(255, 203, 5, 0.5);
  }
`;
