import DrumPad  from './components/DrumPad';
import React  from 'react';
import { faToggleOn, faToggleOff } from "https://esm.sh/@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "https://esm.sh/v135/@fortawesome/react-fontawesome@0.2.0/es2022/react-fontawesome.mjs";


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			AudioContext: window.AudioContext || window.webkitAudioContext,
			audioContext: new AudioContext(),
			sounds: [
				{	
					link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
					name: "Heater 1"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
					name: "Heater 2"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
					name: "Heater 3"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
					name: "Heater 4"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
					name: "Clap"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
					name: "Open HH"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
					name: "Kick n' Hat"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
					name: "Kick"
				},
				{
					link: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
					name: "Closed HH"
				}
			],
			handlerPower: true,
			volumen: 50,
			valueDisplay: ""
 		}
		this.handlePower = this.handlePower.bind(this);
		this.handleVolume = this.handleVolume.bind(this);
		this.handlerDisplay = this.handlerDisplay.bind(this);
	}	
	
	handlePower() {
		if (!this.state.handlerPower) {
			this.setState({handlerPower: !this.state.handlerPower});
		} else {
			this.setState({handlerPower: !this.state.handlerPower,
										valueDisplay: ""});
		}
	}

	handleVolume(e) {
		this.setState({
			volumen: parseFloat(e.target.value)
		});
	}

	handlerDisplay(newValue) {
		this.setState({valueDisplay: this.state.handlerPower ? newValue : ""})
	}
	
	render(){
		
			const textPad = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
			const Drumpads = textPad.map((t, i) => (
				 (<DrumPad idPad={`pad-${i+1}`} textPad={t} contexto={this.state.audioContext} sound={this.state.sounds[i]} handlerPower={this.state.handlerPower} volumen={this.state.volumen} handleDisplay={this.handlerDisplay}/>)
			))

			return(
					<div id="drum-machine" className="row d-flex text-center border m-5">
						<div className="row col gap-1 m-5">
							{Drumpads}
						</div>
						<div className="d-flex flex-column col m-5">
							<label for="power">Power</label>
								<button id="power" className="btn btn-sm btn-outline-secondary" onClick={this.handlePower}><FontAwesomeIcon icon={this.state.handlerPower ? faToggleOn : faToggleOff} /></button>
							
							<div id="display" className="border border-radius d-inline-flex p-2 mt-2 mb-2 bg-light"><p>{this.state.valueDisplay}</p></div>
							<input type="range" id="volume" onChange={this.handleVolume}></input>
						</div>
					</div>

			);
	}
}


export default App;