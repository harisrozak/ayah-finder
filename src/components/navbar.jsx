import React from "react";

const Navbar = ( { appTitle } ) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="col-md-8 offset-md-2">
					<div className="row">
						<div className="col">
							<span className="navbar-brand mb-0 h1">
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

export default Navbar;