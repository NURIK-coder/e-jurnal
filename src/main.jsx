import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'          
import { store } from './store/store'            
import './index.css'
import App from './App.jsx'
import './i18next.js';
import './css/style.css'
import ThemeProvider from './utils/ThemeContext.jsx'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);