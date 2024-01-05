import React from 'react'
import search from "./assets/search.svg"
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Dictionary = () => {
    const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);


  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
     // Check if results are empty
     if (response.data.length === 0) {
        setError('No results found for the given word.');
        setResults(null);
      } else {
        setResults(response.data);
        setError(null);
        let timerInterval;
        Swal.fire({
          title: "Tunggu ya lagi dicari!",
          
          timer: 1200,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    } catch (error) {
      setError('Error fetching data');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kosa kata tidak ditemukan!",
        
      });
      setResults(null);
    }
  };

  // Use useEffect to call fetchData when the query changes
 

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData();
       
      }
  


  return (
    <>
    <div className='max-w-full h-full bg-green-700'>
        <div className='bg-slate-500  w-full h-screen flex-col flex justify-center'>
            <div className='space-y-4 sm:bg-green-800  bg-slate-500 m-auto  sm:max-w-screen-sm  sm:rounded-2xl gap-5 p-5 flex flex-col w-full '>
              <h1 className='text-center text-2xl font-black text-green-400'>What are u looking for?</h1>
              <form onSubmit={handleSubmit}>
                <div className='flex  m-auto  '>
                     <input className='rounded-2xl w-full p-2 hover:bg-green-400 duration-300' placeholder='Search your words' type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}/>
            
            <button className='bg-green-700 m-2 p-2 rounded text-white ' type="submit">Search</button>
                </div>
                   
              </form>
            <div className='flex justify-between gap-4 mt-2'>

                {results !== null && (
                <div>
                 
                <ul className='text-sm'>
                    {results !== null && results.map((result, index) => {
                        return(
                            <div key={index}>
                            <h2 className='text-2xl text-green-400 font-black mb-2'>{result.word}</h2>
                            <li >{result.meanings[0].definitions[0].definition}</li>
                            <br/>
                            
                </div>
                        )
                    })}
                
              </ul>   
                </div>
               
            )}
              <img className='w-[200px] h-[200px] order-last ms-auto' src={search}/>
              
            </div>
            
              
            </div>
            <div className='flex items-end m-auto'><h3 className='text-center  mb-2 text-sm text-gray-700 bg-slate-500'>Copyright© 2024 Ghifary Adnan</h3></div>
        </div>
       

    </div>
    
    </>
  
  )
}

export default Dictionary