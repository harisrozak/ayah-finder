import React, { Component } from "react";
import Select from "react-select";
import surah from "./surah";
import translation from "./translation";

class Form extends Component {
	state = {
		inputSurah: 1,
		inputAyahFrom: 1,
		inputAyahTo: 2,
		inputTranslation: "id.indonesian",
		textToSearch: '',
		numberedSurah: false,
		selectedTranslation: translation[ 0 ],
	}
	
	constructor( props ) {
		super( props );
		
		const numberedSurah = surah.map( ( value ) => { 
			const number = value.value;
			const label = number + '. ' + value.label;
			return { value: number, label: label };
		} );
		
		// set selectedSurah
		this.state.numberedSurah = numberedSurah;
		this.state.selectedSurah = numberedSurah[ 0 ];
	}
	
	handleValue( type, event ) {		
		switch ( type ) {
			case "surah":
				const inputSurah = event.value;
				const selectedSurah = event;
				this.setState( { inputSurah, selectedSurah } );
				break;
				
			case "ayahFrom":
				this.setState( { "inputAyahFrom": event.target.value } );
				break;
					
			case "ayahTo":
				this.setState( { "inputAyahTo": event.target.value } );
				break;
				
			case "translation":
				const inputTranslation = event.value;
				const selectedTranslation = event;
				this.setState( { inputTranslation, selectedTranslation } );
				break;
				
			case "textToSearch":
				this.setState( { "textToSearch": event.target.value } );
				break;
		
			default:
				break;
		}
	}
	
	handleViewAyah( event ) {
		const { onViewAyah, app } = this.props;
		const appViewAyah = onViewAyah.bind( app, this.state );
		
		// do view ayah
		appViewAyah();
		
		// prevent reloading after submit
		event.preventDefault();
	}
	
	handleSearchAyah( event ) {
		// do search ayah
		this.props.onSearchAyah( this.props.app, this.state );
		
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
							onSubmit = { this.handleViewAyah }
							onChange = { this.handleValue }
							state = { this.state }
						/>
					</div>
					<div className="tab-pane fade" id="search-ayah" role="tabpanel" aria-labelledby="search-ayah-tab">
						<FormSearchAyah
							form = { this }
							onSubmit = { this.handleSearchAyah }
							onChange = { this.handleValue }
							state = { this.state }
						/>
					</div>
				</div>					
			</React.Fragment>
		);
	}
}

const FormGoToAyah = ( { form, onSubmit, onChange, state } ) => {	
	return (
		<form onSubmit={ onSubmit.bind( form ) }>
			<div className="form-row mt-4">
				<div className="form-group col-md-4">
					<label htmlFor="inputSurah">Surah:</label>
					<Select 
						isSearchable = { true }
						options = { state.numberedSurah }
						value = { state.selectedSurah }
						onChange = { onChange.bind( form, 'surah' ) }
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="inputAyahFrom">Ayah From:</label>
					<input
						type = "number"
						className = "form-control"
						id = "inputAyahFrom"
						placeholder = "From ayah number"
						value = { state.inputAyahFrom }
						min = "1"					
						onChange = { onChange.bind( form, "ayahFrom" ) }
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="inputAyahTo">Ayah To:</label>
					<input 
						type = "number" 
						className = "form-control" 
						id = "inputAyahTo" 
						placeholder = "To ayah number" 
						value = { state.inputAyahTo } 
						min = "1"
						onChange = { onChange.bind( form, "ayahTo" ) }
					/>
				</div>
				<TranslationDropdown
					form = { form }
					onChange = { onChange }
					state = { state }
				/>
				<div className="col-md-12 text-right">
					<hr className="mb-4" />
					<input className="btn btn-primary" type="submit" value="View Ayah" />
				</div>
			</div>
		</form>
	)
}

const FormSearchAyah = ( { form, onSubmit, onChange, state } ) => {
	return (
		<form onSubmit={ onSubmit.bind( form ) }>
			<div className="form-row mt-4">
				<div className="form-group col-md-10">
					<label htmlFor="inputSurah">Text to search:</label>
					<input 
						className = "form-control"
						placeholder = "Type your string"
						type = "text" 
						id = "textToSearch" 
						value = { state.textToSearch }
						onChange = { onChange.bind( form, 'textToSearch' ) }
					/>
				</div>
				<TranslationDropdown
					form = { form }
					onChange = { onChange }
					state = { state }
				/>
				<div className="col-md-12 text-right">
					<hr className="mb-4" />
					<input className="btn btn-primary" type="submit" value="Search Ayah" />
				</div>
			</div>
		</form>
	)
}

const TranslationDropdown = ( { form, onChange, state } ) => {
	return (
		<div className="form-group col-md-2">
			<label htmlFor="inputAyahTo">Translation:</label>
			<Select
				isSearchable = { false }
				options = { translation }
				value = { state.selectedTranslation }
				onChange = { onChange.bind( form, 'translation' ) }
			/>
		</div>
	)
}

export default Form;