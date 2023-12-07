import './style.css'
//import Item from './item.jsx'
import React, { Suspense } from 'react';
import load from '../../assets/b6e0b072897469.5bf6e79950d23.gif'

const Item = React.lazy(() => delayForDemo(import('./item.jsx')));

export default function Grid ({ data, page, onForwardClick, onPreviousClick }) {
    return (
        <div>
            <div className = 'text-container' id = "intro">
                    <h1 className = "title">Resultado</h1>
                    
                </div>
            <div className="row" id="row-missions">
                {page > 1 && <p className="arrow" id="previus-arrow" onClick={onPreviousClick}>←</p>}
                {data && data.collection && data.collection.items && data.collection.items.map((item, index) => {
                    const img = item.links && item.links[0] ? item.links[0].href : 'default_image_url';
                    return (
                        <Suspense fallback={<img className='loading' src={load} alt="Loading..." />} key={index}>
                            <Item 
                            img={img}
                            title={item.data[0].title}
                            type={item.data[0].media_type}
                            />
                        </Suspense>
                    );
                })}
                 {data.collection.items.length >= 4 && <p className="arrow" id="forward-arrow" onClick={onForwardClick}>→</p>}
            </div>
            <p className='page'>Page: <span className='page-number'>{page}</span></p>
        </div>
    )
  }
  function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }