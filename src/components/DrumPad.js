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
		this.handlerChangeDisplay = this.handlerChangeDisplay.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}	

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown)
	}
	
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown(e) {
		if (e.key.toLowerCase() === this.props.textPad.toLowerCase()) {
		  document.getElementById(this.props.idPad).click();
		}else {
		}
	}
	
  	handlerButton(audioCurrent) {
		const handlerPower = this.props.handlerPower;
		if (handlerPower){
			
			const { playing, currentAudio } = this.state;
			const audioContext = this.props.contexto;
			const audioElement = audioCurrent;
			let volumen = (this.props.volumen)/100;
			if (currentAudio) {
				currentAudio.pause();
				currentAudio.currentTime = 0;
				audioElement.volume = volumen;
				audioElement.play();
			}

			if (audioContext.state === "suspended") {
				audioContext.resume().then(() => {
					if (!playing) {
						audioElement.volume = volumen;
						audioElement.play();
						this.setState({ playing: true, currentAudio: audioElement });
					}
				});
			} else {
				if (!playing) {
					audioElement.volume = volumen;
					audioElement.play();
					this.setState({ playing: true, currentAudio: audioElement });
				}
			}
		}		
	}

	handlerChangeDisplay(){
		this.props.handleDisplay(this.props.sound.name);
	}

	render(){
		let numero = this.state.numero;
		return(
			<button className="drum-pad col-sm-3 btn btn-outline-secondary" onClick={(e) => {this.handlerButton(document.getElementById(this.props.textPad)); this.handlerChangeDisplay()}} id={this.props.idPad} data-playing={this.state.playing}  role="switch" aria-checked="false" >
				{this.props.textPad} 
				<audio src={this.props.sound.link} id={this.props.textPad} key={numero} className="clip"></audio>
			</button>);
	}
}



export default DrumPad;