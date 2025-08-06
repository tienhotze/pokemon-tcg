import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tcgSeries } from '../../data/sets';
import { BrowserContainer, SeriesTitle, SetList, SetItem } from './SetBrowser.styles';

const SetBrowser = () => {
  const [activeSet, setActiveSet] = useState(null);
  const navigate = useNavigate();

  const handleSetClick = (setId) => {
    setActiveSet(setId);
    navigate(`/set/${setId}`);
  };

  return (
    <BrowserContainer>
      {tcgSeries.map(series => (
        <div key={series.name}>
          <SeriesTitle>{series.name}</SeriesTitle>
          <SetList>
            {series.sets.map(set => (
              <SetItem 
                key={set.id} 
                $disabled={set.status !== 'Active'}
                $active={set.id === activeSet}
                onClick={() => set.status === 'Active' && handleSetClick(set.id)}
              >
                {set.name} {set.status !== 'Active' && `(${set.status})`}
              </SetItem>
            ))}
          </SetList>
        </div>
      ))}
    </BrowserContainer>
  );
};

export default SetBrowser;
