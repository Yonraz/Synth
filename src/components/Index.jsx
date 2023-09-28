import Synth from '../features/synth/index'
import SynthControls from './SynthControls'
import { useState, useRef, useEffect } from 'react';
import {transpose, changeOctave, keys} from '../data/keys';
import { getGainNode, setUpGainNodeEnvelope } from '../components/audioServices/GainService';

const Main = () => {
    const [notes, setNotes] = useState([...keys]);
    const currentPlayingNotes = useRef(null);
    const audioCtx = useRef(null)
    useEffect(() => {
        audioCtx.current = new AudioContext({ sampleRate: 44000, latencyHint: 'interactive', bitDepth: 16 });
        currentPlayingNotes.current = [];
    }, [])

    var startNewOsc = (note) => {
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = note.frequency;
        return osc;
    }


    var play = (note) => {
      let playingNotes = currentPlayingNotes.current;
      const osc = startNewOsc(note);
      const newNote = {
        id: note.id,
        note: note,
        osc: osc
      };
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
      currentPlayingNotes.current =  [...playingNotes, newNote];
      const gainNode = getGainNode(audioCtx.current);
      gainNode.connect(audioCtx.current.destination);
      setUpGainNodeEnvelope(audioCtx.current, gainNode, [0.1, 0.1, 0.1, 0.7], 0.1);
      osc.connect(gainNode);
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
    let playingNotes = currentPlayingNotes.current;
    const oscIndex = playingNotes.findIndex((n) => n.id === note.id);
    if (oscIndex === -1) return;
    const osc = playingNotes[oscIndex].osc;
    osc.stop();
    osc.disconnect();
    currentPlayingNotes.current.splice(oscIndex, 1);
  };


    return (
        <>
            <Synth play={play} stopPlaying={stopPlaying} notes={notes} setNotes={setNotes}/>
            <SynthControls transpose={handleTranspose} changeOctave={handleOctaveChange}/>
        </>
    )
}

export default Main;