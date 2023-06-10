import React, { useState } from 'react';
import axios from 'axios';


const ViandesPoissons = () => {

  const [data, setData] = useState([]);

  const handleClick = () => {
    axios.get('https://webscrap972.onrender.com/scrapall/scrapeviandespoissons')
    .then(response => {
      console.log('data from response:', response.data)
      setData(response.data)
    })
    .catch(error => {
      console.log(error);
    });
};

    return (
      <>
          <h1 className="text-yellow-400 text-center w-screen p-1">Viandes & Poissons</h1>

          <div className='flex flex-col items-center bg-white w-screen h-screen p-4'>
            <div>
              <h1 className='text-center'>Viandes & Poissons prices review</h1>
              <div className='text-center bg-black text-white w-60 rounded-full m-5'>
                <button onClick={handleClick}>Scrape Viandes & Poissons</button>
              </div> 
            </div>
          <div>

          <div className='grid grid-cols-2 bg-white h-auto'>
            {data.map((item, index) => (
              <div key={index} className="text-center p-4 border m-2">
                <div className='flex w-24 absolute '>
                  <img
                    className="p-4"
                    src={item.nutrifull}
                    width="150"
                    height="150"
                  />
                </div>
                
                <div className='flex gap-6 justify-center'>
                  <img
                    className=""
                    src={item.img}
                    alt={item.nom}
                    width="200"
                    height="200"
                  />
                </div>
                
                <div className='flex justify-between items-center'>
                  <p className='text-center font-semibold px-4'> {item.nom} </p>
                  <div>
                    <p className='text-center font-semibold p-2 text-red-700 border border-blue-700 mb-1 text-xs'> {item.prix} </p>
                    <p className='text-center font-semibold p-2 text-green-700 border border-red-700 text-xs'> {item.prixspecial} </p>
                    <p className='text-xs'> {item.prixunite} </p>
                  </div>
                </div>
              
                <div className='flex flex-row items-center'>
                  <p className='text-blue-600 font-bold text-xs px-3'> {item.quantite2} </p>
                </div>          
              </div>
            ))}
          </div>
          </div>
          </div>
        </>
    )
     
  }

  export default ViandesPoissons;