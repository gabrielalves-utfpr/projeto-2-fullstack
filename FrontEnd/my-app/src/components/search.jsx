import { useState } from 'react';

export default function Search ({ onSearch }) { 
  const [text, setText] = useState('');

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      onSearch(text);
    }
  }

  return (
    <div className="search">
      <h1 className="welcome">
        Type to search midia in<span className="nasa-font"> NASA</span>
      </h1>
      <input
        id="searchbar"
        type="text"
        name="text"
        placeholder="Search..."
        className="input"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )}