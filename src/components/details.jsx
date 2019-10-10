import React from "react";
import surah from "./surah";

const DetailsView = ( { app, detailsData, isLoadingDetails, onPlayAudio } ) => {
	let ayahName, ayahJuz, ayahText, translationText, listenButton;
	
	if( isLoadingDetails ) {
		ayahName = "Detail Ayah";
		translationText = "Loading data..";
	}
	else if( ! detailsData || detailsData.code !== 200 ) {	
		ayahName = "Detail Ayah";
		translationText = "Error geting data, please try again later";
	}
	else {
		const ayah = detailsData.data[ 0 ];
		const translation = detailsData.data[ 1 ];
		const surahData = ayah.surah;	
	
		ayahName = surah[ ayah.surah.number - 1 ].label + ' : ' + ayah.numberInSurah;
		ayahJuz = <button type="button" className="btn btn-sm btn-warning">Juz : { ayah.juz }</button>;
		ayahText = ayah.text;
		translationText = translation.text;
		listenButton = (
			<button 
				type = "button" 
				className = "btn btn-sm btn-info"
				onClick = { onPlayAudio.bind( app, surahData.number, ayah.numberInSurah ) }
			>Listen the Recitation</button>
		);
	}	
	
	return (
		<div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div className="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalCenterTitle">{ ayahName }</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p className='ayah'>{ ayahText }</p>
						<p className='translation'>{ translationText }</p>
					</div>
					<div className="modal-footer">
						{ ayahJuz }
						{ listenButton }
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailsView;