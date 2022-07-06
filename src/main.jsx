import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { HeroesApp } from './HeroesApp'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/react-heroes-spa-vite'>
      <HeroesApp />
    </BrowserRouter>
  </React.StrictMode>
)
