import React  from 'react';

class DrumPad extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			numero: parseInt(this.props.idPad.match(/\d+/)),
			playing: false,
			currentAudio: null
		}
		this.handlerButton = this.handlerButton.bind(this);
	}	
	
  handlerButton() {
		const handlerPower = this.props.handlerPower;
		if (handlerPower){
			
			const { playing, currentAudio, numero } = this.state;
			const audioContext = this.props.contexto;
			const audioElement = document.getElementById(`audio-${numero}`);
			if (currentAudio) {
				// Si hay un sonido en reproducción, detenlo
				currentAudio.pause();
				currentAudio.currentTime = 0;
				audioElement.volume = this.props.volumen;
				audioElement.play();
			}

			if (audioContext.state === "suspended") {
				audioContext.resume().then(() => {
					if (!playing) {
						audioElement.volume = this.props.volumen;
						audioElement.play();
						this.setState({ playing: true, currentAudio: audioElement });
					}
				});
			} else {
				if (!playing) {
					audioElement.volume = this.props.volumen;
					audioElement.play();
					this.setState({ playing: true, currentAudio: audioElement });
				}
			}
		}
  }

	render(){
		let numero = this.state.numero;
		return(
			<button className="drum-pad col-sm-3 btn btn-outline-secondary" onClick={this.handlerButton} id={this.props.idPad} data-playing={this.state.playing}  role="switch" aria-checked="false" >
				{this.props.textPad} 
				<audio src={this.props.sound} id={`audio-${numero}`} key={numero}></audio>
			</button>);
	}
}


export default DrumPad;