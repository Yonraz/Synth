/* eslint-disable react/prop-types */
import Keyboard from "./Keyboard";
import {keysToNotesMap} from "../../data/keys";
import { useEffect, useState } from "react";

const Synth = (props) => {
    const {play, stopPlaying, notes, setNotes, onPitchShiftActive, onPitchShiftReleased} = props;
    let pitchShift = false;

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [notes])
    
    const handleKeyDown = (e) => {
        if (e.key in keysToNotesMap){
            const noteID = keysToNotesMap[e.key];
            const key = notes.filter(keyboardKey => keyboardKey.id === noteID)[0];
            if (key.isPressed) return;
            handleStartPlaying(key);
        }
        else if (e.key === 'Shift') {
            if (pitchShift) return;
            else pitchShift = true;
            e.preventDefault();
            onPitchShiftActive()
        }
    }

    const handleKeyUp = (e) => {
        if (e.key in keysToNotesMap){
            const noteID = keysToNotesMap[e.key];
            const key = notes.filter(keyboardKey => keyboardKey.id === noteID)[0];
            handleStopPlaying(key);
        }
        else if (e.key === 'Shift') {
            pitchShift = false;
            e.preventDefault();
            onPitchShiftReleased()
        }
    }

    const handleStartPlaying = (note) => {
            const {key, keyIndex} = getKeyAndIndex(note);
            if (key.isPressed) return;
            setNotes((prevNotes) => {
                const newNotes = [...prevNotes];
                newNotes[keyIndex].isPressed = true;
                return newNotes;
            })
            play(key)
    }
    const handleStopPlaying = (note) => {
            const {key, keyIndex} = getKeyAndIndex(note);
            setNotes((prevNotes) => {
                const newNotes = [...prevNotes];
                newNotes[keyIndex].isPressed = false;
                return newNotes;
            })
            stopPlaying(key)
    }
    const getKeyAndIndex = (note) => {
        let keyIndex;
        let key;
        keyIndex = notes.findIndex((k) => k.id === note.id);
        key = notes[keyIndex];
        return {key, keyIndex};
    }

    const handleMouseDown = (note) => {
        handleStartPlaying(note);
    } 
    const handleMouseUp = (note) => {
        handleStopPlaying(note);
    }

    return (
        <>
            <h1>Synth</h1>
            <Keyboard keys={notes} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp}/>
        </>
    )
}
export default Synth;