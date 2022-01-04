import React from 'react'
import '../Row.css'
function Rowrecommend({resarray}) {
    // console.log(resarray)
    return (
        <div>
                <div className='row'>
                {/* <h2>{title}</h2> */}
                <div className='row__posters'>
                    {resarray.map((movie,index)=>(
                        ( 
                           
                            <img 
                                className={'row__poster'} 
                                key={index}
                                src={"http://image.tmdb.org/t/p/w300/"+movie.poster_path} 
                                alt={movie.title} 
                                />
                        )
                       
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default Rowrecommend
