import './App.css';
//import Header from './components/header/header.jsx'
//<Header/>

import Home from './components/home.jsx'
import Login from './components/login/login.jsx'
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
        
        <Routes>
          <Route path="/*" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
    
  );
}


/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/