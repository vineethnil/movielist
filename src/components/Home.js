import React from 'react';
import './main.css';
import Header from './Header';
import Select from 'react-select';

const employeeoption = [
	{ value: "Fantasy", label: "Fantasy"},
	{ value: "Sci-fi", label: "Sci-fi"},
	{ value: "Action", label: "Action"},
	{ value: "Drama", label: "Drama"},
	{ value: "Musical", label: "Musical"},
	{ value: "Comedy", label: "Comedy"},
	{ value: "Romance", label: "Romance"},
	{ value: "Thriller", label: "Thriller"},
	{ value: "Crime", label: "Crime"},
	{ value: "Supernatural horror", label: "Supernatural horror"},
	{ value: "Biography", label: "Biography"},
	{ value: "Mystery", label: "Mystery"},
	{ value: "Comedy-drama", label: "Comedy-drama"},
];

class Home extends React.Component {

	constructor (props) {
		super(props);
		this.state= {
			mv_genre:"",
			movie_list:[],
			showempty:false,
			data:{
				mv_name:'',
				mv_year:'',
			},
			isloading:false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChangeGener = this.handleSelectChangeGener.bind(this);
		this.searcMovies = this.searcMovies.bind(this);

	}

	
	// HandleInput change
	handleChange(e){
		this.setState({
	      data: { ...this.state.data, [e.target.name]: e.target.value }
	    });
	}

	// handle change in dropdown
	handleSelectChangeGener = (selectedOption) =>{
		this.setState({ 
	    	mv_genre:selectedOption,
	   	});
	}

	//search movies
	searcMovies(){
		this.setState({
			movie_list:[],
			isloading:true,
			showempty:false,
		})

		// setting filter and key values
		var movie_key = this.state.data.mv_name.length>0?'key='+ this.state.data.mv_name:'';
		var movie_filter=[];
		if(this.state.data.mv_year.length>0){
			movie_filter.push('{"year":'+this.state.data.mv_year+'}');
		}
		if(this.state.mv_genre.value){
			movie_filter.push('{"genre":"'+this.state.mv_genre.value+'"}');
		}
		var filter = movie_filter.length>0?'&filter=['+movie_filter+']':'';

		var url = 'https://moviesearch2019.herokuapp.com/movies';
		if(movie_key.length>0 || filter.length>0){
			url = 'https://moviesearch2019.herokuapp.com/search?'+movie_key+filter;
		}

		//fetching movie results
		fetch(url)
		.then(response => response.json())
		.then(parsedJSON => {
			if(parsedJSON.length>0){
				this.setState({
					isloading:false,
					movie_list:parsedJSON
				})
			}else{
				this.setState({
					isloading:false,
					showempty:true
				})
			}
			
			
		})
		.catch(error => {
			this.setState({
				isloading:false
			})
			console.log('parsing failed',error)
		})
	}


	render() {

		const movieList=this.state.movie_list.map((movie, index) => {
		  return (
		  	<div className="col-sm-4"  key={movie.id}>
			  	<div className="movie_file">
			  		<div className="movie_title">
			  			<p>{movie.title}</p>
			  			<div className="mvyear">{movie.year}</div>
			  			<div className="mvtime">{movie.duration}</div>
			  		</div>
			  		<div className="movieDetails">
			  			<div className="movieDes">{movie.description}</div>
			  			<div className="genrePin pinBox">
			  				<span>Genre:</span>
					  		{movie.genre.map((gen, index) => {
					  			return (
					  			<div className="pinTab" key={index}>{gen}</div>
					  			)
					  		})}
				  		</div>
			  			<div className="directorPin pinBox">
			  				<span>Director:</span>
					  		{movie.director.map((dir, index) => {
					  			return (
					  			<div className="pinTab" key={index}>{dir}</div>
					  			)
					  		})}
				  		</div>
				  		<div className="ratingbox">
				  			<p>Ratings</p>
				  			{movie.reviews.map((rev, index) => {
					  			return (
					  				<div className="revPin" key={index}><span className="prvder">{rev.provider}</span> <span className="rating">{rev.rating}</span></div>
				  				)
					  		})}
				  		</div>
			  		</div>
			  	</div>
			</div>
		 );
		});


		return (
			<div>
				<Header/>
				<div id="searchContainer">
					<h4>Search Movie</h4>
					<div className="searchBox">
						<div className="mv_name">
							<input 
							  	id="mv_name" 
								name="mv_name"
					            value={this.state.data.mv_name}
								type='text' 
								autoComplete="off"
								placeholder="Movie Name"
								required
								onChange={this.handleChange}
							  	/>
						</div>
						<div className="mv_year">
							<input
								id="mv_year" 
								name="mv_year"
								min="1900" 
								max="2099" 
								step="1"
					            value={this.state.data.mv_year}
								type='Number' 
								autoComplete="off"
								placeholder="Year"
								required
								onChange={this.handleChange}
							/>
						</div>
						<div className="mv_genre">
							<Select
								id="mv_genre" 
								name="mv_genre"
						        value={this.state.mv_genre}
						        onChange={this.handleSelectChangeGener}
						        options={employeeoption}
						        isSearchable='true'
						        placeholder="Genre"
						      />
					    </div>
					</div>
					<button className="srchbtn" onClick={this.searcMovies}>Search</button>

					<div id="movieListContainer">
						{this.state.isloading?<div className="loading"></div>:""}
						{this.state.showempty?<div>No Movies Found</div>:''}
						<div className="row movieBox">
						    {movieList}
						</div>
					</div>
				</div>	
			</div>
		);
	}

}
export default Home