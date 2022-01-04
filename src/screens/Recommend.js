import React, { useState } from 'react'
import Rowrecommend from './Rowrecommend';
const tmdb = require('themoviedb-api-client')('5bb9aa11ddf2636579e91619af719002');
let resjson
// let resarray
function Recommend() {
    const [searchmovie,Setsearchmovie] = useState('');
    const [boolstate,Setboolstate] = useState(false);
    const [resarray,Setresarray] = useState([]);
      const handleSubmit = async (e) => {
        e.preventDefault();
        const movie = searchmovie;
        
        // const mdb = new MovieDB('5bb9aa11ddf2636579e91619af719002');
        const api_key='5bb9aa11ddf2636579e91619af719002';
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5bb9aa11ddf2636579e91619af719002&query=${movie}`);
        // console.log(response)
        // const response = await fetch("http://localhost:8000/search", {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     movie
        //   })
        // });
        const json = await response.json();
        let movie_id = json.results[0].id;
        // console.log(json.results[0].id);
        const res=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=5bb9aa11ddf2636579e91619af719002&language=en-US&page=1`)
        resjson = await res.json();
        Setboolstate(true);
        // console.log(resjson)
        Setresarray(resjson.results)
        // console.log(resjson.results[0])
      }
    return (
        <>
            <div>
                <section className="searchbox-wrap">
                    <h1 style={{color:'white',marginLeft:'20px',}}>Get Recommendations</h1>
                    <form onSubmit={handleSubmit}>
                        <input style={{marginLeft:'20px',padding:'10px 20px'}}
                            type="text"
                            placeholder="Search up a show or movie..."
                            className="searchbox"
                            onChange = {e => Setsearchmovie(e.target.value)}
                        />
                        <button style={{padding:'10px 20px',fontSize: '1rem',marginTop: '1%',width: '15%',color: '#fff',backgroundColor: '#e50914',fontWeight: '600',border: 'none',cursor: 'pointer'}}>Search</button>
                        </form>
                    </section>
            </div>
            
            {boolstate? <Rowrecommend resarray={resjson.results}/>:console.log('')}
        </>
    )
}

export default Recommend
