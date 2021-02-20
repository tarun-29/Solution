import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import LazyLoader from "./LazyLoader"


function Character({ character, firstCharacterRef, index }) {

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <div className="characterBox" ref={index === 0 ? firstCharacterRef : null} onClick={onOpenModal}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <LazyLoader src={character.image} threshold={[0, 0.5, 1]} />
          {/* <img className="character-image" style={{ borderRadius: 100, height: 50, width: 50 }} src={character.image} alt={character.name} /> */}
          <h3 style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10 }}>{character.name}</h3>
          <p style={{ marginTop: 15 }}>{character.status === "unknown" ? "Unknown" : character.status} - {character.species}</p>
        </div>
      </div>
      <Modal style={{ borderRadius: '50', fontFamily: "sans-serif" }} open={open} onClose={onCloseModal} center>
        <div style={{ color: 'black', textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'row', margin: 10, justifyContent: 'space-around'}}>
            <img className="character-image" style={{ borderRadius: 100, height: 100, width: 100 }} src={character.image} alt={character.name} />
            <div style={{ marginLeft: 50 }}>
              <h3 style={{ fontSize: 25, marginTop: 15 }}>{character.name}</h3>
              <p style={{ marginTop: 20, }}>{character.status === "unknown" ? "Unknown" : character.status} - {character.species}</p>
            </div>
          </div>
          <hr
            style={{
              backgroundColor: 'gray',
              height: 1
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <p style={{ fontSize: 10, marginTop: 10,fontWeight: 'lighter' }}>Gender</p>
                <p>{character.gender === "unknown" ? "Unknown" : character.gender}</p>
                <p style={{ fontSize: 10, marginTop: 20,fontWeight: 'lighter' }}>Species</p>
                <p>{character.species === "unknown" ? "Unknown" : character.species}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
              <div>
                <p style={{ fontSize: 10, marginTop: 10,fontWeight: 'lighter' }}>Location</p>
                <p>{character.location.name=== "unknown" ? "Unknown" : character.location.name}</p>
                <p style={{ fontSize: 10, marginTop: 20, fontWeight: 'lighter'}}>Origin</p>
                <p>{character.origin.name === "unknown" ? "Unknown" : character.origin.name}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Character;
