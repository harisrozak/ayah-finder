import React, { Component } from "react";
import Select from "react-select";
import surah from "./surah";

class Form extends Component {
	state = {
		inputSurah: 1,
		inputAyahFrom: 1,
		inputAyahTo: 2,
		selectedSurah: surah[ 0 ],
	}
	
	handleValue( type, event ) {
		switch ( type ) {
			case "surah":
				const selected = event;
				const inputSurah = selected.value;
				const selectedSurah = selected;
				this.setState( { inputSurah, selectedSurah } );
				break;
				
			case "ayahFrom":
				this.setState( { "inputAyahFrom": event.target.value } )
				break;
					
			case "ayahTo":
				this.setState( { "inputAyahTo": event.target.value } )
				break;
		
			default:
				break;
		}
	}
	
	handleSubmit( event ) {
		const { onSearchAyah } = this.props;
		const { inputSurah, inputAyahFrom, inputAyahTo } = this.state;
		
		// do search ayah
		onSearchAyah( inputSurah, inputAyahFrom, inputAyahTo );
		
		// prevent reloading after submit
		event.preventDefault();
	}
	
	render() {
		return (
			<React.Fragment>
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="go-to-ayah-tab" data-toggle="tab" href="#go-to-ayah" role="tab" aria-controls="go-to-ayah" aria-selected="true">Go to Ayah</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" id="search-ayah-tab" data-toggle="tab" href="#search-ayah" role="tab" aria-controls="search-ayah" aria-selected="false">Search Ayah by Keywords</a>
					</li>
				</ul>
				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="go-to-ayah" role="tabpanel" aria-labelledby="go-to-ayah-tab">						
						<FormGoToAyah 
							form = { this }
							onSubmit = { this.handleSubmit }
							onChange = { this.handleValue }
							selectedSurah = { this.state.selectedSurah }
							inputAyahFrom = { this.state.inputAyahFrom }
							inputAyahTo = { this.state.inputAyahTo } 
						/>
					</div>
					<div className="tab-pane fade" id="search-ayah" role="tabpanel" aria-labelledby="search-ayah-tab">
						BLA BLA
					</div>
				</div>					
			</React.Fragment>
		);
	}
}

const FormGoToAyah = ( { form, onSubmit, onChange, selectedSurah, inputAyahFrom, inputAyahTo } ) => {
	return (
		<form onSubmit={ onSubmit.bind( form ) }>
			<div className="form-row mt-4">
				<div className="form-group col-md-4">
					<label htmlFor="inputSurah">Surah:</label>
					<Select 
						isSearchable = { true }
						options = { surah }
						value = { selectedSurah }
						onChange = { onChange.bind( form, 'surah' ) }
					/>
				</div>
				<div className="form-group col-md-4">
					<label htmlFor="inputAyahFrom">Ayah From:</label>
					<input
						type = "number"
						className = "form-control"
						id = "inputAyahFrom"
						placeholder = "From ayah number"
						value = { inputAyahFrom }
						min = "1"					
						onChange = { onChange.bind( form, "ayahFrom" ) }
					/>
				</div>
				<div className="form-group col-md-4">
					<label htmlFor="inputAyahTo">Ayah To:</label>
					<input 
						type = "number" 
						className = "form-control" 
						id = "inputAyahTo" 
						placeholder = "To ayah number" 
						value = { inputAyahTo } 
						min = "1"
						onChange = { onChange.bind( form, "ayahTo" ) }
					/>
				</div>
				<div className="col-md-12 text-right">
					<hr className="mb-4" />
					<input className="btn btn-primary" type="submit" value="Search Ayah" />
				</div>
			</div>
		</form>
	)
}

export default Form;