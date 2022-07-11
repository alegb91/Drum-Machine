import React from 'react';
import './App.css';
import {useState, useEffect} from "react";

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

// const bankTwo = [
//   {
//     keyCode: 81,
//     keyTrigger: 'Q',
//     id: 'Chord-1',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
//   },
//   {
//     keyCode: 87,
//     keyTrigger: 'W',
//     id: 'Chord-2',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
//   },
//   {
//     keyCode: 69,
//     keyTrigger: 'E',
//     id: 'Chord-3',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
//   },
//   {
//     keyCode: 65,
//     keyTrigger: 'A',
//     id: 'Shaker',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
//   },
//   {
//     keyCode: 83,
//     keyTrigger: 'S',
//     id: 'Open-HH',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
//   },
//   {
//     keyCode: 68,
//     keyTrigger: 'D',
//     id: 'Closed-HH',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
//   },
//   {
//     keyCode: 90,
//     keyTrigger: 'Z',
//     id: 'Punchy-Kick',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
//   },
//   {
//     keyCode: 88,
//     keyTrigger: 'X',
//     id: 'Side-Stick',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
//   },
//   {
//     keyCode: 67,
//     keyTrigger: 'C',
//     id: 'Snare',
//     url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
//   }
// ];

function App() {

  const [volume, setVolume] = useState(1)

  const [recording, setRecording] = useState("")

  const [speed, setSpeed] = useState(0.5)

  const playRecording = ()=> {

      let index = 0;

      let recordArray = recording.split(" ");

      const interval = setInterval(()=> {
        const audioTag = document.getElementById(recordArray[index])
        audioTag.currentTime = 0;
        audioTag.play();
        audioTag.volume = volume;
        index ++;
      }, speed * 600);
      setTimeout(()=> {
        clearInterval(interval)}, speed * 600 * recordArray.length - 1
      )
  };

  const volumeDisplay = Math.round(volume * 100);

  return (
    <div className="principal container" id="drum-machine">
      <div id="display" className="row background"></div>
      <div id="display" className="row fila">

         {/* ---------------IZQUIERDA---------------- */}

          <div align="center" className="mt-5 col-10 col-sm-10 col-md-8 col-lg-6 col-xl-5 d-flex justify-content-center align-items-center">
            <div className="izquierda">
              {audioClips.map(clip => <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>)}
            </div>
          </div>

          {/* ---------------DERECHA---------------- */}

          <div className="mt-3 col-10 col-sm-10 col-md-8 col-lg-6 col-xl-5 derecha">

              <h4>Volume</h4>       
                <span className="tagw">{volumeDisplay}</span>
                <input onChange={e => setVolume(e.target.value)} value={volume} type="range" step="0.01" max="1" min="0" className="w-50" id="rangew"/> 
              <h3>{recording}</h3>
              {recording && (
                <>
                <div>
               <button onClick={playRecording} className="m-2 btn btn-success play">play</button>
               <button onClick={()=> setRecording("")} className="m-2 btn btn-danger clear">clear</button>
               </div> 
               <br/>
               
               <h4>Speed</h4>    
               <span className="tagw">{speed}</span>         
               <input onChange={e => setSpeed(e.target.value)} value={speed} type="range" step="0.01" max="1.2" min="0.1" className="w-50" id="rangew"/> 
               </>
              )}
          </div>
              {/* ------------------------------- */}
      </div>
    </div>
  );
}

const Pad = ({clip, volume, setRecording}) => {

    const [active, setActive] = useState(false)


    useEffect(()=> {
        document.addEventListener("keydown", handleKeyPress);
        return ()=> {
          document.removeEventListener("keydown", handleKeyPress);
        }
    })

    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode)
        playSound();
    }


    const playSound = ()=> {
      const audioTag = document.getElementById(clip.keyTrigger)
      setActive(true);
      setTimeout(()=>setActive(false), 200)
      audioTag.currentTime = 0;
      audioTag.play();
      audioTag.volume = volume;
      setRecording(prev => prev + clip.keyTrigger + " ")
    }

    return (
      <div onClick={playSound} type="button" id="boton" className={`drum-pad p-3 col-1 btn  ${active ? "btn-danger" : "btn-light"}`}>{clip.keyTrigger}<audio className="clip" id={clip.keyTrigger} src={clip.url}/></div>
    )
}

export default App;
