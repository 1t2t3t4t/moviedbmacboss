import React from 'react';
const Navbar = ()=>{
    return(
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className='container'>
                        
                        <a className="navbar-brand" href="#">Movie DB</a>
                        
                        <div className="collapse navbar-collapse" id="navbarNav">
                            
                            <ul className="navbar-nav">
                                
                                <li className="nav-item ">
                                    <a className="nav-link title" href="#">Home </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link title" href="#">Trending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link title" href="#">Upcoming</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link title" href="#">Now Showing</a>
                                </li>
                            
                            </ul>

                            <div className='ml-5'>
                                <form className="form-inline shadow-none">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                    <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </div>
                        
                        </div>
                
                </div> 
            
            </nav>
        
        </div>

    );
}
export default Navbar;