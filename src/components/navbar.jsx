import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
	render() {
		const { appTitle } = this.props;
		
		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<div className="col-md-8 offset-md-2">
						<div className="row">
							<div className="col">
								<span className="navbar-brand mb-0 h1">
									<FontAwesomeIcon icon={ faStream } />
									<span className="ml-2">{ appTitle }</span>
								</span>
							</div>					
							<div className="col align-self-end text-right">							
								&nbsp;
							</div>									
						</div>
					</div>
					
						
				</div>
			</nav>		
		);
	}
}

export default Navbar;