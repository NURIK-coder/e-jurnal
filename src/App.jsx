import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout'

function App() {

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <div className=''>
      <Layout/>
    </div>
    
  )
}

export default App
