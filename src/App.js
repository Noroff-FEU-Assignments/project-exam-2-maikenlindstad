import './css/styles.css';
import { useState, useRef, useEffect } from 'react';
// import Navigation from './components/layout/layoutComponents/Navigation';
import Layout from './components/layout/Layout';


function App() {

  useEffect(() => {
    document.title = "NO.CO | Join the Noroff Community";
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
