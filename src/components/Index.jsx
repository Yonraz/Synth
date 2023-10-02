import Synth from '../features/synth/index'
import SynthControls from './SynthControls'
import './index.css'
import { useState, useRef, useEffect } from 'react';
import {transpose, changeOctave, keys} from '../data/keys';
import { getGainNode, setUpGainNodeEnvelope, handleRelease } from '../components/audioServices/GainService';
import {handlePitchShiftUp, handlePitchShiftDown} from '../components/audioServices/FrequencyService'
import AdsrSection from '../features/adsrSection';

const Main = () => {
    const [notes, setNotes] = useState([...keys]);
    const [currentNotes, setCurrentNotes] = useState([]);
    const audioCtx = useRef(null)
    const [ampAttack, setAmpAttack] = useState(0.01);
    const [ampDecay, setAmpDecay] = useState(0.5);
    const [ampSustainAmount, setAmpSustainAmount] = useState(0.1);
    const [ampRelease, setAmpRelease] = useState(0.2);
    const [volumeAmount, setVolumeAmount] = useState(0.4)
    useEffect(() => {
        audioCtx.current = new AudioContext({ sampleRate: 44000, latencyHint: 'interactive', bitDepth: 16 });
    }, [])

    var startNewOsc = (note) => {
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = note.frequency;
        return osc;
    }

    var onPitchShiftActive = () => {
      console.log('pitchshift active')
      currentNotes.forEach((note) => {
        handlePitchShiftUp(audioCtx.current, note.osc)
      })
    }

    var onPitchShiftReleased = () => {
      console.log('pitchshift released')
      currentNotes.forEach((note) => {
        const originalFreq = notes.filter(originalNote => originalNote.id === note.id)[0].frequency;
        console.log(notes.filter(originalNote => originalNote.id === note.id))
        handlePitchShiftDown(audioCtx.current, note.osc, originalFreq)
      })
    }


    var play = (note) => {
      if (currentNotes.length === 1){
        const lastNote = currentNotes[0];
        stopPlaying(lastNote)
      }
      const osc = startNewOsc(note);
      const gainNode = getGainNode(audioCtx.current);
      gainNode.connect(audioCtx.current.destination);
      setUpGainNodeEnvelope(audioCtx.current, gainNode, [ampAttack, ampDecay, ampSustainAmount, ampRelease], volumeAmount);
      osc.connect(gainNode);
      const newNote = {
        id: note.id,
        note: note,
        osc: osc,
        gainNode: gainNode
      };
      setCurrentNotes(prevNotes => [...prevNotes, newNote]);
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      osc.start();
  };

  const handleTranspose =  (isUp) => {
    const newNotes = transpose(isUp, notes);
    setNotes(newNotes);
  }

  const handleOctaveChange = (isUp) => {
    const newNotes = changeOctave(isUp, notes);
    setNotes(newNotes);
  }

  const stopPlaying = (note) => {
    const oscIndex = currentNotes.findIndex((n) => n.id === note.id);
    if (oscIndex === -1) return;
    const {osc, gainNode} = currentNotes[oscIndex];
    handleRelease(audioCtx.current, gainNode, ampRelease);
    stopOscillator(osc)
    setCurrentNotes(prevNotes => [...prevNotes.splice(oscIndex, 1)]);
  };

  const stopOscillator = (osc) => {
    setTimeout(() => {
      osc.stop();
    }, ampRelease*1000 )
  }

    return (
        <>
        <div className='container'>
            <Synth  play={play} 
                    stopPlaying={stopPlaying} 
                    notes={notes} 
                    setNotes={setNotes}
                    onPitchShiftActive={onPitchShiftActive}
                    onPitchShiftReleased={onPitchShiftReleased}/>
            <div className='controls-and-noteview-container'>
                <SynthControls transpose={handleTranspose} changeOctave={handleOctaveChange}/>
                <AdsrSection 
                  attack={ampAttack} 
                  setAttack={setAmpAttack} 
                  decay={ampDecay}
                  setDecay={setAmpDecay} 
                  sustainAmount={ampSustainAmount}
                  setSustainAmount={setAmpSustainAmount} 
                  release={ampRelease}
                  setRelease={setAmpRelease}/>
            </div>
        </div>
        </>
    )
}

export default Main;