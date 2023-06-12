import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppFooter from './Components/AppFooter/AppFooter';
import AppHeader from './Components/AppHeader/AppHeader';
import PageContent from './Components/PageContent/PageContent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppHeader/>
      <PageContent/>
      <AppFooter/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
