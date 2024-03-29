import React from "react";
import surah from "./surah";

const Result = ( { app, response, type, isError, isLoading, onPlayAudio, matchesCount, onViewDetails } ) => {
	if( isError ) {
		return <div className="alert alert-danger">Error requesting data. Please check your request and try again.</div>
	}
	else if( isLoading ) {
		return <div className="alert alert-info">Loading data..</div>
	}
	else if( type === 'viewAyah' ) {
		return (
			<ResultViewAyahs 
				app = { app } 
				data = { response.data } 
				onPlayAudio = { onPlayAudio } 
			/>
		)
	}
	else if( type === 'searchAyah')  {
		const countNotification = ( matchesCount === false ) ? false : (
			<div className="alert alert-info">Found <strong>{ matchesCount }</strong> matches ayah(s)</div>
		);
		
		return (
			<React.Fragment>
				{ countNotification }
				<ResultSearchAyahs 
					app = { app }
					data = { response.data } 
					onViewDetails = { onViewDetails }
				/>
			</React.Fragment>			
		)
	}
	else {
		return <span>&nbsp;</span>
	}
}

const ResultViewAyahs = ( { app, data, onPlayAudio } ) => {
	const surahData = data[ 0 ];
	const ayahs = surahData.ayahs;
	const translation = data[ 1 ].ayahs;
	
	if( Array.isArray( ayahs ) ) {
		return (
			<React.Fragment>
				{ ayahs.map( ( ayah, index ) => (
					<ViewAyah 
						key = { index } 
						surahData = { surahData } 
						ayah = { ayah } 
						translation = { translation[ index ] } 
						app = { app }
						onPlayAudio = { onPlayAudio }
					/>
				) ) }
			</React.Fragment>
		)
	}
	else {
		return <div className="alert alert-info">Data not found. Please check your request and try again.</div>
	}	
}

const ViewAyah = ( { surahData, ayah, translation, app, onPlayAudio } ) => {
	let text = ayah.text;
	
	// remove the beginning basmallah except for the surah al-fatihah
	if( surahData.number > 1 && ayah.numberInSurah === 1 ) {
		text = text.replace( "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", '' );
	}
	
	return (
		<div className='ayah-container'>
			<hr className="my-4"></hr>
			<div className="mb-2">
				<span className="badge badge-info mr-2">{ surah[ ( surahData.number - 1 ) ].label } : { ayah.numberInSurah }</span>
				<span className="badge badge-warning mr-2">Juz : { ayah.juz }</span>
				<span 
					className=  "badge badge-dark mr-2 listen-button"
					onClick = { onPlayAudio.bind( app, surahData.number, ayah.numberInSurah ) }
				>Listen</span>
			</div>
			<p className='ayah'>{ text }</p>
			<p className='translation'>{ translation.text }</p>
		</div>
	)
}

const ResultSearchAyahs = ( { app, data, onViewDetails } ) => {
	const matches = data.matches;
	
	if( Array.isArray( matches ) ) {
		return (
			<React.Fragment>
				{ matches.map( ( ayah, index ) => (
					<ViewMatches 
						key = { index } 
						ayah = { ayah } 
						app = { app }
						onViewDetails = { onViewDetails }
					/>
				) ) }
			</React.Fragment>
		)
	}
	else {
		return <div className="alert alert-info">Data not found. Please check your request and try again.</div>
	}
}

const ViewMatches = ( { ayah, app, onViewDetails } ) => {
	return (
		<div className='ayah-container'>
			<hr className="my-4"></hr>
			<div className="mb-2">
				<span className="badge badge-info mr-2">{ surah[ ( ayah.surah.number - 1 ) ].label } : { ayah.numberInSurah }</span>
				<span 
					className=  "badge badge-dark mr-2 listen-button"
					onClick = { onViewDetails.bind( app, ayah.surah.number, ayah.numberInSurah ) }
					data-toggle="modal" 
					data-target="#exampleModalCenter"
				>View Details</span>
			</div>
			<p className='translation'>{ ayah.text }</p>
		</div>
	)
}

export default Result;