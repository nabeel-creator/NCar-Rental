import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import footer from "./footer";
import Header from "./Header1.jsx";
const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
    
      <RouterProvider router={router} />
      
    </Provider>
  </StrictMode>
);
