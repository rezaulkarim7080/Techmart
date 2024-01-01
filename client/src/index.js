import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';


ReactDOM.render(
  <AuthProvider>

    <SearchProvider>
      <CartProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>,
  document.getElementById('root')
);

reportWebVitals();
