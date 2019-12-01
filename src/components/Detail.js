import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const Detail = (props) =>{
    const [movieDetail,setMovieDetail] = useState({});
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

            <div className='container mt-4'>

                    <div className='row' >
                        <div className='col-4' >
                            <img src={imgUrl}  alt ={movieDetail.title} className='rounded w-100'/>
                        </div>
    
                        <div className='col-8 '>
                            <h3 className='title font-weight-bold'>{movieDetail.title}</h3>
                        </div>
                        
                    </div>
                   
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