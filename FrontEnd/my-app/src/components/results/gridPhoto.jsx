import './style.css'
import React, { Suspense } from 'react';
import load from '../../assets/b6e0b072897469.5bf6e79950d23.gif'

const Item = React.lazy(() => delayForDemo(import('./item.jsx')));

export default function Grid ({ data }) {
    return (
        <div>
            <div className = 'text-container' id = "intro">
                    <h1 className = "title">Resultado</h1>
                    
                </div>
            <div className="row" id="row-missions">
                {data && data.news && data.news.map((item, index) => {
                    const img = item.image;
                    return (
                        <Suspense fallback={<img className='loading' src={load} alt="Loading..." />} key={index}>
                            <Item 
                            img={img}
                            title={item.title}
                            />
                        </Suspense>
                    );
                })}
            </div>
        </div>
    )
  }
  function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }
