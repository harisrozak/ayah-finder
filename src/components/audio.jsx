import React from "react";
import ReactAudioPlayer from "react-audio-player";
import surah from "./surah";

const AudioPlayer = ( { app, audioData, onCloseAudio, isLoadingAudioData } ) => {	
	if( isLoadingAudioData ) {
		return (
			<div className="toast audio-container">
				<div className="toast-header">
					<strong className="mr-auto">Loading audio data..</strong>
					<button type="button" className="ml-2 mb-1 close">
						<span aria-hidden="true">&nbsp;</span>
					</button>
				</div>
			</div>
		)
	}
	else if( audioData && audioData.code === 200 ) {	
		const ayah = audioData.data[ 0 ];
				
		return (
			<div className="toast audio-container">
				<div className="toast-header">
					<strong className="mr-auto">{ surah[ ayah.surah.number - 1 ].label } : { ayah.numberInSurah }</strong>
					<small>Mishary Rashid Alafasy</small>
					<button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true" onClick={ onCloseAudio.bind( app ) }>&times;</span>
					</button>
				</div>
				<div className="toast-body text-center">
					<ReactAudioPlayer
						src={ ayah.audio }
						autoPlay
						controls
					/>
				</div>
			</div>
		)
	}
	else if( audioData && audioData.code !== 200 ) {	 
		return (
			<div className="toast audio-container">
				<div className="toast-header">
					<strong className="mr-auto">Error</strong>
					<button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true" onClick={ onCloseAudio.bind( app ) }>&times;</span>
					</button>
				</div>
				<div className="toast-body text-center">Error loading audio data, please try again.</div>
			</div>
		)
	}
	else {
		return false;
	}
}

export default AudioPlayer;