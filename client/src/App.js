import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrapePage from './components/ScrapePage';

import { Router, Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./pages/Home"
import Dairy from "./pages/Dairy"
import Dairy2 from "./pages/Dairy2"
import Boissons from "./pages/Boissons"
import Entretien from './pages/Entretien';
import FruitsLegumes from './pages/FruitsLegumes';
import Surgeles from './pages/Sugeles';
import ViandesPoissons from './pages/ViandesPoissons';

function App() {
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/scrape');

      setArticles(data);
      
    }

    fetchData();
    // console.log('data: ', articles);
  }, []);

  return (
    <div className='w-full bg-black'>$

      <Navbar />

      <div className="container">

          <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/boissons" element={<Boissons />} />
            <Route path="/dairy" element={<Dairy />} />
            <Route path="/dairy2" element={<Dairy2 />} />
            <Route path="/entretien" element={<Entretien />} />
            <Route path="/fruits-legumes" element={<FruitsLegumes />} />
            <Route path="/surgeles" element={<Surgeles />} />
            <Route path="/viandes-poissons" element={<ViandesPoissons />} />

          </Routes>
        
      </div>
      
      
      {/* <h1>Liste d'articles 123-click </h1> */}
      {/* <ul> */}
        {/* {data.map((item, index) => (
          <li key={index}>
            <p href={item.nom}>{item.quantite}</p>
          </li>
        ))} */}
      {/* </ul> */}
    </div>
  );
}

export default App;
