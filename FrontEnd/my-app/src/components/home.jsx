import './style.css'
import React, { useState, Suspense, useEffect } from 'react';
//import searchAPI from '../../nasaApi/searchApi.js';
import Search from './search.jsx'
import Insert from './insert.jsx'
import newsAPI from '../api/newsAPI.js'
import load from '../assets/b6e0b072897469.5bf6e79950d23.gif'
import Notification from './notification.jsx'
import { useNavigate } from 'react-router-dom';

const Grid = React.lazy(() => delayForDemo(import('./results/gridPhoto.jsx')));

export default function Home(){
    const navigate = useNavigate();
    let auth = localStorage.getItem('auth')
    if(auth === null || auth === '' || auth === ' '){
        navigate('/login')
    }
    const logout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
      };
    const [error, setError] = useState(null);
    const resultAreaRef = React.useRef(null);
    const homeAreaRef = React.useRef(null);
    const [data, setData] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleSearch = async (text) => {
        if(text == null || text === ''){
            setError('ESPAÇO DE PESQUISA EM BRANCO')
        }else{
            setSearchText(text);
        }
    }
    
    useEffect(()=>{
        (async() => {
            if(searchText !== ''){
                try {
                    const response = await newsAPI.search(searchText);
                    setData(response);
                    console.log(response)
                    if(response != null){ 
                        if(response.news.length === 0){
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
    }, [searchText])
    
    return(
        <div className='home'>
            <Notification/>
            <button onClick={logout}>Logout</button>
            <div className = 'image-container' ref={homeAreaRef}>
                <div className='row'>
                    <div className='inline-block'>
                        <Search onSearch={handleSearch}/>
                        {error && <div className="error">ERROR: {error}</div>}
                    </div>
                    <div className='inline-block'>
                        <Insert/>
                    </div>
                    
                </div>
                <div className="scrolldown">
                    <h3>Scroll Down</h3>
                    <h3>\↓/</h3>
                </div>
            </div>
            <div className = "content" ref={resultAreaRef}>
                <Suspense fallback={<img className='loading' src={load} alt="Loading..." />}>
                    {data && <Grid data={data} />}
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