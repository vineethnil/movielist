import React from 'react';
import './main.css';

class Header extends React.Component {

	constructor (props) {
		super(props);
		this.state= {
			data:{
				movie_name:'',
			},
		}
	}

	//function call on load
	componentDidMount(){
		
	}


	render() {
		return (
			<div id="headingContainer">
				<header className="container">
					<h1>Movie Basket</h1>		
				</header>		
			</div>
		);
	}

}
export default Header