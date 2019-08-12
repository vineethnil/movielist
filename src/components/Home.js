import React from 'react';
import './main.css';
import $ from 'jquery';
import Header from './Header';
import Select from 'react-select';

const employeeoption = [
	{ value: 'Not Applicable', label: 'Not Applicable'},
	{ value: 'Vamshi Chityala', label: 'Vamshi Chityala' },
	{ value: 'Shiva Kumar', label: 'Shiva Kumar' },
	{ value: 'Madhusudhan Reddy', label: 'Madhusudhan Reddy' },
	{ value: 'Saksham Harivyasi', label: 'Saksham Harivyasi' },
	{ value: 'Raj Parolia', label: 'Raj Parolia'},
	{ value: 'Vamshikrishna K', label: 'Vamshikrishna K'},
	{ value: 'Tag Partner', label: 'Tag Partner'},
	{ value: 'Not Traceable', label: 'Not Traceable'},
];

class Home extends React.Component {

	constructor (props) {
		super(props);
		this.state= {
			mv_genre:"",
			data:{
				mv_name:'',
			},
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSelectChangeGener = this.handleSelectChangeGener.bind(this);

	}

	//function call on load
	componentDidMount(){
		
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
	    	mv_gener:selectedOption,
	   	});
	}


	render() {
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
						      />
					    </div>
					</div>
				</div>	
			</div>
		);
	}

}
export default Home