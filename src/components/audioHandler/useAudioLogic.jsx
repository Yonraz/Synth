
import { useState, useRef, useEffect } from 'react';
import {transpose, changeOctave, keys} from '../../data/keys';
import { getGainNode, setUpGainNodeEnvelope, handleRelease } from '../../components/audioServices/GainService';
import {handlePitchShiftUp, handlePitchShiftDown} from '../../components/audioServices/FrequencyService';

export default function useAudioLogic ({ampEnv, filterEnv, volumeAmount}) {
    const [notes, setNotes] = useState([...keys]);
    const [currentNotes, setCurrentNotes] = useState([]);
    const audioCtx = useRef(null)
    const {
      attack: ampAttack, 
      decay: ampDecay, 
      sustain: ampSustain, 
      release: ampRelease} = ampEnv;
    const {
      attack: filterAttack, 
      decay: filterDecay, 
      sustain: filterSustain, 
      release: filterRelease} = filterEnv;

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
      currentNotes.forEach((note) => {
        handlePitchShiftUp(audioCtx.current, note.osc)
      })
    }

    var onPitchShiftReleased = () => {
      console.log('pitchshift released')
      currentNotes.forEach((note) => {
        const originalFreq = notes.filter(originalNote => originalNote.id === note.id)[0].frequency;
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
      setUpGainNodeEnvelope(audioCtx.current, gainNode, [ampAttack, ampDecay, ampSustain, ampRelease], volumeAmount);
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

  return {
    notes,
    setNotes,
    handleOctaveChange,
    handleTranspose,
    play,
    stopPlaying,
    onPitchShiftActive,
    onPitchShiftReleased,
  }
}