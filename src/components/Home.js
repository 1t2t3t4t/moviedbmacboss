import React,{useState,useEffect} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';
import '../styles/Home.css';
import heart from '../media/love.png';
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import { CardBody, Card,UncontrolledCollapse,UncontrolledTooltip,Spinner } from 'reactstrap';

const Home = ()=>{

    const [trending,setTrending] = useState([]);

    const [trendingPage, setTrendingPage] = useState(1);
    
    const [upComing,setUpcoming] = useState([]);

    const [upComingPage, setUpcomingPage] = useState(1);

    const [trendingLoading,setTrendingLoading] = useState(false);

    const [upComingLoading,setUpComingLoading] = useState(false);




    useEffect(()=>{
        const fetchData =async ()=>{

            const trendResponse = await axios.get(`https://movie-mb-api.herokuapp.com/home/trending?page=${trendingPage}&limit=6`);
            setTrending(trendResponse.data.results);

            const upcomingResponse = await axios.get(`https://movie-mb-api.herokuapp.com/home/upcoming?page=${upComingPage}&limit=6`);
            setUpcoming(upcomingResponse.data.results);
            
           setTrendingLoading(true);
           setUpComingLoading(true);
        }
        fetchData();

    },[trendingPage,upComingPage])
    //console.log(upComing)

    const renderLoading = ()=>{
        const arr = ['','','','','','']; // for array of 6 items
        return (
            <div className='row mt-4'>
                {arr.map(()=> { 
                    return(
                    <div className='col-4 text-center align-self-center' style={{height:'400px'}}>
                       
                            <Spinner  className='align-middle text-center 'style={{ width: '5rem', height: '5rem',marginTop:'50%' }} />
                        
                    </div>
                )
                } ) }
            </div>
        )
    }


    const renderTrending = () =>{
        const movieThumnailDoamin = 'https://image.tmdb.org/t/p/w500';
        return(
            <div className='card-columns mt-4 '>
                {trending.map((idx)=>{
                    const score = Math.floor(idx.vote_average/2);
                    const id = uuid();
                    const shortOverview = idx.overview.split('').slice(0,100).join('');

                    return(
                    
                       
                            <div className="card  hvr-float  p-0" key={id}>                 
                                <img className="card-img-top" src={`${movieThumnailDoamin}${idx.poster_path}`} alt={idx.title}/>                     
                                    <div className="card-body">                               
                                            <h5 className="card-title" ><Link to={`/movie/${idx.id}`} className='text-dark' id={`UncontrolledTooltipExample${idx.id}`}>{idx.title} </Link></h5>
                                                <UncontrolledTooltip placement="right" target={`UncontrolledTooltipExample${idx.id}`}>
                                                    Open new page
                                                </UncontrolledTooltip>
                                            <p className="card-text">{shortOverview}...  <a><button className='as-text' id={`toggler${idx.id}`}><strong>Readmore</strong></button></a></p>   
                                            
                                            <UncontrolledCollapse toggler={`#toggler${idx.id}`}>
                                                <Card>
                                                    <CardBody>
                                                    {idx.overview}
                                                    </CardBody>
                                                </Card>
                                                </UncontrolledCollapse> 
                                            {Array(score).fill(<img className='mr-1' src={heart} style={{width:'1rem'}}/>)}
                                            <p className="card-text mt-1"><small className="text-muted">Release Date {moment(idx.release_date).format('LL')}</small></p>
                                    </div>                                                
                            </div>
                       
                        )
                })}                    
            </div>
        )                    
    }


    const renderUpcoming = () =>{
        const movieThumnailDoamin = 'https://image.tmdb.org/t/p/w500';
        return(
            <div className='card-columns mt-4 '>
                {upComing.map((idx)=>{
                    const score = Math.floor(idx.vote_average/2);
                    const id = uuid();
                    const shortOverview = idx.overview.split('').slice(0,100).join('');
                   
                    return(

                        
                            <div className="card  hvr-float  p-0" key={id}>                 
                                <img className="card-img-top" src={`${movieThumnailDoamin}${idx.poster_path}`} alt={idx.title}/>                     
                                    <div className="card-body">  

                                            <h5 className="card-title" ><Link to={`/movie/${idx.id}`} className='text-dark' id={`UncontrolledTooltipExample${idx.id}`}>{idx.title}</Link></h5>
                                                <UncontrolledTooltip placement="right" target={`UncontrolledTooltipExample${idx.id}`}>
                                                    Open new page
                                                </UncontrolledTooltip>

                                            <p className="card-text">{shortOverview}...  <a><button className='as-text' id={`toggler${idx.id}`}><strong>Readmore</strong></button></a></p>   
                                            
                                                <UncontrolledCollapse toggler={`#toggler${idx.id}`}>
                                                    <Card>
                                                        <CardBody>
                                                        {idx.overview}
                                                        </CardBody>
                                                    </Card>
                                                    </UncontrolledCollapse>  
                                            
                                            {Array(score).fill(<img className='mr-1' src={heart} style={{width:'1rem'}}/>)}
                                            <p className="card-text mt-1"><small className="text-muted">Release Date {moment(idx.release_date).format('LL')}</small></p>
                                    </div>                                                
                            </div>
                        
                        )
                }
                )}                    
            </div>
        )                    
    }

    const renderTrendingPagination = () =>{
        const disablePrevious = trendingPage === 1 ? 'page-item disabled' : 'page-item'
        return (
                    <nav className='mr-2'>
                        <ul className='pagination'>
                            <li className={disablePrevious}><a className='page-link' onClick={handleTrendPaginationPreviousClick}> {`<`} </a></li>
                            <li className='page-item'><a className='page-link'> {trendingPage}  </a></li>
                            <li className='page-item'><a className='page-link' onClick={handleTrendPaginationNextClick}> > </a></li>
                        </ul>
                    </nav>
        )
    }

    const handleTrendPaginationPreviousClick = () =>{
        
        //check for page number not equal to one to prevent page = 0

      if(trendingPage === 1){
         return ; 
      }else if( trendingPage >1 ){
          let page = trendingPage;
          page--;
          setTrendingPage(page);
          setTrendingLoading(false);
        }
      
    }

    const handleTrendPaginationNextClick = () =>{
        let page = trendingPage;
        page++;
        setTrendingPage(page);
        setTrendingLoading(false);

      }


    // For upcoming section
      const renderUpcomingPagination = () =>{
        const disablePrevious = upComingPage === 1 ? 'page-item disabled' : 'page-item'
        return (
                    <nav className='mr-2'>
                        <ul className='pagination'>
                            <li className={disablePrevious}><a className='page-link' onClick={handleUpcomingPaginationPreviousClick}> {`<`} </a></li>
                            <li className='page-item'><a className='page-link'> {upComingPage}  </a></li>
                            <li className='page-item'><a className='page-link' onClick={handleUpComingPaginationNextClick}> > </a></li>
                        </ul>
                    </nav>
        )
    }

    const handleUpcomingPaginationPreviousClick = () =>{
        //check for page number not equal to one to prevent page = 0
      if(upComingPage === 1){
          console.log('upconing previous work');
         return ; 
      }else if( upComingPage >1 ){
          let page = upComingPage;
          page--;
          setUpcomingPage(page);
          setUpComingLoading(false);
      }
    }

    const handleUpComingPaginationNextClick = () =>{
        let page = upComingPage;
        page++;
        setUpcomingPage(page);       
        setUpComingLoading(false); 
      }

    

    return(
        <div className=''>
            <Navbar/>
            
            
            
                <div className='container mt-5'>
                        <div className='d-flex'>
                            <h3 className='mr-auto title'>Now Trending</h3>
                            {trending && renderTrendingPagination()}
                        </div>
                            {trendingLoading? renderTrending() : renderLoading() }

                        <div className='d-flex'>
                            <h3 className='mr-auto title'>Upcoming</h3>
                            {upComing && renderUpcomingPagination()}
                         </div>
                        {upComingLoading? renderUpcoming() : renderLoading()}

                </div>
               

            
        </div>

    );
}
export default Home;