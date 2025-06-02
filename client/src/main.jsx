import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
 import store from './Store/store.js'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    
    
     <Provider store={store}>
     <BrowserRouter>
     <App/>
     </BrowserRouter>
     <Toaster/>
     </Provider>
   
    
)
