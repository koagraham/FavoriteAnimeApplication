import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

axios.get('http://localhost:8001/api/anime').then(({ data }) => {
  console.log(`Original data: ${data}`)
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App initialAnimeList={data}/>
    </React.StrictMode>,
  )
})
