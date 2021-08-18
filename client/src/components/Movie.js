/**
 * Tom Bielawski
 * Lambda School WEB45 
 * Unit 3.3.3 axios get/put/delete
 * 8/18/2021
**/
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import DeleteMovieModal from './DeleteMovieModal';

const Movie = (props) => {
    //State declarations
    const { addToFavorites } = props;
    const [movie, setMovie] = useState('');
    const { id } = useParams();
    const { push } = useHistory();

    //useEffect with call and id
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res=>{
                setMovie(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    }, [id]);

    //delete handler function
    const handleDeleteMovie = () => {
        //Call the api, pass in the id
        axios.delete(`http://localhost:5000/api/movies/${id}`)
            .then(res=>{
                //console.log("DELETE HANDLER>>>", res);
                //call the delete movie()
                props.deleteMovie(id);
                //Push back to movie list
                push("/movies");
            })
            .catch(err=>{
                console.log(err.response);
            })
    }

    return(<div className="modal-page col">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">						
                    <h4 className="modal-title">{movie.title} Details</h4>
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="movie-details">
                            <div>
                                <label>Title: <strong>{movie.title}</strong></label>
                            </div>
                            <div>
                                <label>Director: <strong>{movie.director}</strong></label>
                            </div>
                            <div>
                                <label>Genre: <strong>{movie.genre}</strong></label>
                            </div>
                            <div>
                                <label>Metascore: <strong>{movie.metascore}</strong></label>
                            </div>
                            <div>
                                <label>Description:</label>
                                <p><strong>{movie.description}</strong></p>
                            </div>
                        </section>
                        
                        <section>
                            <span className="m-2 btn btn-dark">Favorite</span>
                            <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                            {/* Add the onclick */}
                            <span onClick = {handleDeleteMovie} className="delete"><input type="button" className="m-2 btn btn-danger" value="Delete"/></span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Movie;