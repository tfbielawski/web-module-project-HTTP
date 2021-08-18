import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddMovieForm = (props) => {
    //For pushing to updated movie form
	const { push } = useHistory();
	
	//useParams to get the id
	const { id } = useParams();

	//Passing in setMovies as props, 
	const {setMovies} = props;

    //Initial state
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: "",
       
	});

    //Change handler
	const handleChange = (e) => {
        //Sets movies
        setMovie({
            //Spreads in current values
            ...movie,
            [e.target.name]: e.target.value
        });
    }
	

    //Submit handler
	const handleSubmit = (e) => {
		e.preventDefault();
        //Call the api, NO id
		axios.post(`http://localhost:5000/api/movies/`, movie)
			.then(res=> {
			//Set the movies, push to the newly edited form
			//Change setMovie to setMovies to save state across form
			setMovies(res.data);
            console.log("SUBMIT!")
			push(`/movies/`);
			})
			.catch(err=> {
				console.log(err);
			})
	}


	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default AddMovieForm;