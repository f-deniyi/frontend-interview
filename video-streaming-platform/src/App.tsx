import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from './context';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
