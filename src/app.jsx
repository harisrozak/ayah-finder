import React, { Component } from "react";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import Result from "./components/result.jsx";
import AudioPlayer from "./components/audio.jsx";
import DetailsView from "./components/details.jsx";

class App extends Component {
	state = {
		appTitle: "Ayah Quran Finder",
		apiResponse: false,
		apiResponseType: false,
		isLoading: false,
		isError: false,
		audioData: false,
		isLoadingAudioData: false,
		matchesCount: false,
		detailsData: false,
		isLoadingDetails: false,
	};
	
	componentDidUpdate( prevProps, prevState ) {		
		// apiResponse
		if( prevState.apiResponse !== this.state.apiResponse ) {
			const response = this.state.apiResponse;
			
			if( ! response || response.code !== 200 ) {
				this.setState( { isError: true } );
			}
			else {
				this.setState( { isError: false } );
			}
		}
		
		// apiResponse
		if( prevState.detailsData !== this.state.detailsData ) {
			const response = this.state.detailsData;
			
			if( ! response || response.code !== 200 ) {
				this.setState( { isError: true } );
			}
			else {
				this.setState( { isError: false } );
			}
		}
		
		// isLoading
		if( prevState.isLoading !== this.state.isLoading && this.state.isLoading === true ) {
			this.setState( { isError: false } );
		}
	}
	
	handleViewAyah( data ) {
		// offset
		const offset = data.inputAyahFrom - 1;
		
		// limit
		let limit = data.inputAyahTo - offset;
		limit = limit < 1 ? 1 : limit;
		
		// api url
		let apiUrl = "https://api.alquran.cloud/v1/surah/";
		apiUrl += data.inputSurah;
		apiUrl += "/editions/quran-uthmani,";
		apiUrl += data.inputTranslation;
		apiUrl += "?offset=" + offset + "&limit=" + limit;
		
		// do loading screen
		this.setState( { "isLoading": true } );
		
		// do send request
		fetch( apiUrl )
      		.then( res => res.json() )
      		.then(
				(result) => {
					this.setState( {
						apiResponse: result,
						apiResponseType: 'viewAyah',
						isLoading: false,
					} );
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				( error ) => {
					this.setState( {
						isLoading: false,
						isError: true,
						error
					} );
				}
			);
	}
	
	handlePlayAudio( surahNumber, ayahNumber ) {
		// api url
		let apiUrl = "https://api.alquran.cloud/v1/ayah/";
		apiUrl += surahNumber + ':' + ayahNumber;
		apiUrl += "/editions/ar.alafasy";
		
		// display loading audio data screen
		this.setState( { isLoadingAudioData: true } );
		
		// do send request
		fetch( apiUrl )
      		.then( res => res.json() )
      		.then(
				(result) => {
					this.setState( {
						audioData: result,
						isLoadingAudioData: false,						
					} );
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				( error ) => {
					this.setState( {
						error
					} );
				}
			);
	}
		
	handleCloseAudio() {
		this.setState( { audioData: false } );
	}
	
	handleSearchAyah( data ) {
		// api url
		let apiUrl = "https://api.alquran.cloud/v1/search/";
		apiUrl += data.textToSearch;
		apiUrl += "/all/";
		apiUrl += data.inputTranslation;
		console.log(apiUrl);
		// do loading screen
		this.setState( { "isLoading": true } );
		
		// do send request
		fetch( apiUrl )
      		.then( res => res.json() )
      		.then(
				(result) => {
					this.setState( {
						apiResponse: result,
						apiResponseType: 'searchAyah',
						matchesCount: result.data.count,
						isLoading: false,
					} );
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				( error ) => {
					this.setState( {
						isLoading: false,
						isError: true,
						error
					} );
				}
			);
	}
	
	handleViewDetails( surahNumber, ayahNumber ) {
		// api url
		let apiUrl = "https://api.alquran.cloud/v1/ayah/";
		apiUrl += surahNumber + ':' + ayahNumber;
		apiUrl += "/editions/quran-uthmani,";
		apiUrl += "id.indonesian";
		
		// display loading audio data screen
		this.setState( { isLoadingDetails: true } );
		
		// do send request
		fetch( apiUrl )
      		.then( res => res.json() )
      		.then(
				(result) => {
					this.setState( {
						detailsData: result,
						isLoadingDetails: false,						
					} );
					
					console.log(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				( error ) => {
					this.setState( {
						error
					} );
				}
			);
	}
	
	render() {
		const appTitle = this.state.appTitle;
		
		return (
			<React.Fragment>
				<Navbar appTitle={ appTitle } />
				<div className="container my-3">
					<div className="col-md-8 offset-md-2">
						<Form
							app = { this }
							onViewAyah = { this.handleViewAyah }
							onSearchAyah = { this.handleSearchAyah }
						/>
						<div className="mt-4">
							<Result 
								app = { this }
								response = { this.state.apiResponse }
								type = { this.state.apiResponseType }
								isError = { this.state.isError }
								isLoading = { this.state.isLoading }
								onPlayAudio = { this.handlePlayAudio }
								matchesCount = { this.state.matchesCount }
								onViewDetails = { this.handleViewDetails }
								/>
						</div>
					</div>
				</div>
				<AudioPlayer 
					app = { this }
					audioData = { this.state.audioData } 
					onCloseAudio = { this.handleCloseAudio }
					isLoadingAudioData = { this.state.isLoadingAudioData }
				/>
				<DetailsView
					app = { this }
					detailsData = { this.state.detailsData }
					isLoadingDetails = { this.state.isLoadingDetails }
					onPlayAudio = { this.handlePlayAudio }
				/>
			</React.Fragment>
		)
	}
}

export default App;