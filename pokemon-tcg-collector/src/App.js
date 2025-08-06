import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import SetBrowser from './components/SetBrowser/SetBrowser';
import CardGrid from './components/CardGrid/CardGrid';
import CardPage from './components/CardPage/CardPage';
import { baseSetCards } from './data/base_set_cards';
import useLocalStorage from './hooks/useLocalStorage';
import GlobalStyle from './globalStyles';

function App() {
  const [allCards] = useState(baseSetCards);
  const [collection, setCollection] = useLocalStorage('userCollection', {});

  const handleSearch = (searchTerm) => {
    // This function will need to be adapted to search across all sets,
    // or be context-aware of the current set being viewed.
    // For now, we'll leave it as a placeholder.
    console.log("Searching for:", searchTerm);
  };

  const toggleCardInCollection = (cardId) => {
    const newCollection = { ...collection };
    if (newCollection[cardId]) {
      delete newCollection[cardId];
    } else {
      newCollection[cardId] = { quantity: 1, condition: 'NM' };
    }
    setCollection(newCollection);
  };

  return (
    <Router>
      <GlobalStyle />
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<SetBrowser />} />
        <Route path="/set/:setId" element={
          <CardGrid
            cards={allCards} // This will be filtered based on setId
            collection={collection}
            onToggleCard={toggleCardInCollection}
          />
        } />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
