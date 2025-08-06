import React from 'react';
import { HeaderContainer, Logo, SearchInput } from './Header.styles';

const Header = ({ onSearch }) => {
  return (
    <HeaderContainer>
      <Logo>Pokémon TCG Collector</Logo>
      <SearchInput
        type="text"
        placeholder="Search for a card..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </HeaderContainer>
  );
};

export default Header;
