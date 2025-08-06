import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import SetBrowser from './components/SetBrowser/SetBrowser';
import CardGrid from './components/CardGrid/CardGrid';
import CardPage from './components/CardPage/CardPage';
import { baseSetCards } from './data/base_set_cards';
import useLocalStorage from './hooks/useLocalStorage';
import GlobalStyle from './globalStyles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [allCards] = useState(baseSetCards);
  const [collection, setCollection] = useLocalStorage('userCollection', {});

  const handleSearch = (searchTerm) => {
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
    <ErrorBoundary>
      <Router>
        <GlobalStyle />
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<SetBrowser />} />
          <Route path="/set/:setId" element={
            <CardGrid
              cards={allCards}
              collection={collection}
              onToggleCard={toggleCardInCollection}
            />
          } />
          <Route path="/card/:id" element={<CardPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
