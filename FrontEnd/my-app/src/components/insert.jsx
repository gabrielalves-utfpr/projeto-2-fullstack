import React from 'react';
import { useState } from 'react';
import newsAPI from '../api/newsAPI';

export default function Insert () { 
    const [title, setTitle] = React.useState('');
    const [image, setImage] = React.useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        if (event.target.name === 'title') {
            setTitle(event.target.value);
        } else if (event.target.name === 'image') {
            setImage(event.target.value);
        }
    }

    
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        try {
            const response = await newsAPI.insert(title, image)
            setError(response.message)
        } catch (error) {
            console.error('Erro na autenticação', error);
        }
    }
  }

  return (
    <div className="search">
      <h1 className="welcome">
        Inserir News na<span className="nasa-font"> NASA</span>
      </h1>
      <input
        id="searchbar"
        type="text"
        name="title"
        placeholder="DIGITE O TITULO"
        className="input"
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
      />
      <input
        id="searchbar"
        type="text"
        name="image"
        placeholder="DIGITE A URL DA IMAGEM"
        className="input"
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
      />
      {error && <div className="error">RESULTADO: {error}</div>}
    </div>
  )}