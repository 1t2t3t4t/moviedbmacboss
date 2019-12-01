import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Detail.css';
const Detail = (props) =>{
    const [movieDetail,setMovieDetail] = useState(false);
    useEffect(()=>{
        const fetch = async () =>{
            const fectchData = await axios.get(`https://movie-mb-api.herokuapp.com/movie/${props.match.params.id}`)
            setMovieDetail(fectchData.data);
        }
        fetch();
    },[])
    
    const renderMovieDetail = () =>{

        const imgUrl = `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`;
        
        return(
            
            <div className='detail'>
                {movieDetail &&
                <div className='container pt-5'>
                    
                        <div className='row' >
                            <div className='col-4' >
                                <img src={imgUrl}  alt ={movieDetail.title} className='rounded w-100'/>
                            </div>
        
                            <div className='col-8 '>
                                <a className='text-dark' target='_blank' href={movieDetail.homepage}><h3 className='title font-weight-bold mb-2'>{movieDetail.title}</h3></a>
                                <h5 className='title mt-5'><strong>Overview</strong></h5>
                                <p className='lead'>{movieDetail.overview}</p>
                                <div className='d-flex ' >
                                    <p className='btn btn-primary btn-sm ' ><strong>IMDB Score : </strong></p>
                                    <p className='ml-2 ' style={{paddingTop:'3px'}}>{movieDetail.vote_average}/10 from {movieDetail.vote_count}</p>
                                </div>
                                <p><strong>Release Date : </strong>{movieDetail.release_date}</p>
                                <p className='d-flex mb-0'><strong>Genres : </strong><ul className='list-inline ml-2'>{movieDetail.genres.map(idx=> <li className='list-inline-item'>{idx.name}</li>)}</ul></p>
                                {movieDetail.status ==='Released' ? 
                                    <button type="button" class="btn btn-success ">Now Showing</button> :
                                    <button type="button" class="btn btn-danger">Outdate</button>
                                }
                                
                            </div>
                            
                        </div>
                    
                </div>
                }
            </div>
        );
    }
    return(
        <div>
            <Navbar/>
            {renderMovieDetail()}
        </div>
    );
}
export default Detail;