import './style.css'
import React, { useState, Suspense, useEffect } from 'react';
//import searchAPI from '../../nasaApi/searchApi.js';
import Search from './search.jsx'
import load from '../assets/b6e0b072897469.5bf6e79950d23.gif'

const Grid = React.lazy(() => delayForDemo(import('./results/gridPhoto.jsx')));

export default function Home(){
    const [error, setError] = useState(null);
    const resultAreaRef = React.useRef(null);
    const homeAreaRef = React.useRef(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const handleSearch = async (text) => {
        if(text == null || text === ''){
            setError('ESPAÇO DE PESQUISA EM BRANCO')
        }else{
            setSearchText(text);
        }
    }

    const handleForwardClick = async () => {
        const newPage = page+1
        setPage(newPage);
        
    }
    const handlePreviousClick = async () => {
        if (page > 0) {
            const newPage = page-1
            setPage(newPage);
            
            
        }
    }
    /*
    useEffect(()=>{
        (async() => {
            if(searchText !== ''){
                try {
                    const response = await searchAPI.search(searchText, page);
                    setData(response);
                    if(response != null){ 
                        if(response.collection.items.length === 0){
                            homeAreaRef.current.scrollIntoView({ behavior: 'smooth' })
                            setError('NÃO FOI ENCONTRADO NADA')
                        }else{
                            resultAreaRef.current.scrollIntoView({ behavior: 'smooth' })
                            setError(null)
                        }
                    } else setError('SEM RESPOSTA DO SERVIDOR');
                } catch (er) {
                    setError(er);
                }
    }
    })();
    }, [page, searchText])
    */
    return(
        <div className='home'>
            <div className = 'image-container' ref={homeAreaRef}>
                <Search onSearch={handleSearch}/>
                {error && <div className="error">ERROR: {error}</div>}
                <div className="scrolldown">
                    <h3>Scroll Down</h3>
                    <h3>\↓/</h3>
                </div>
            </div>
            <div className = "content" ref={resultAreaRef}>
                <Suspense fallback={<img className='loading' src={load} alt="Loading..." />}>
                    {data && <Grid data={data} page={page} onForwardClick={handleForwardClick} onPreviousClick={handlePreviousClick}/>}
                </Suspense>
            </div>
        </div>
    )
}
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}