import React,{useState,useEffect} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import '../styles/Home.css';
import heart from '../media/love.png';

const Home = ()=>{

    const [state,setState] = useState([]);

    useEffect(()=>{
        const fetchData =async ()=>{
            const response = await axios.get('https://movie-mb-api.herokuapp.com/home/trending');
            setState(response.data.results);
        }
        fetchData();
    },[])

    const renderMovieList = () =>{
        const movieThumnailDoamin = 'https://image.tmdb.org/t/p/w500';
        return(
            <div className='card-columns mt-4 '>
                {state.map((idx)=>{
                    const score = Math.floor(idx.vote_average/2);
                    return(

                        <div className=''>
                            <div className="card  hvr-float  p-0">                 
                                <img className="card-img-top" src={`${movieThumnailDoamin}${idx.poster_path}`} alt={idx.title}/>                     
                                    <div className="card-body">                               
                                            <h5 className="card-title">{idx.title}</h5>
                                            <p className="card-text">{idx.overview}</p>   
                                            {Array(score).fill(<img className='mr-1' src={heart} style={{width:'1rem'}}/>)}
                                            <p className="card-text mt-1"><small className="text-muted">On cinema {moment(idx.release_date).format('LL')}</small></p>
                                    </div>                                                
                            </div>
                        </div>
                        )
                }
                )}                    
            </div>
        )                    
    }

    return(
        <div className='container mt-5'>
            {renderMovieList()}
        </div>
    );
}
export default Home;