import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from './context';
import Router from './router'
function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
