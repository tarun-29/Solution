import React from 'react';
import Character from './Character.js';

function MappedOutput({ characters }) {
  return (
    <div className="search-output">
      {
        characters.length > 0 ?
        // <LazyLoader character={character}/> : null
          characters.map((character, index) => <Character character={character} key={character.id} index={index}/>) :null
      }
    </div>
  );
}

export default MappedOutput;