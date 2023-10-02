import Synth from '../features/synth/index'
import SynthControls from './SynthControls'
import './index.css'
import useAudioLogic from './audioHandler/useAudioLogic';
import AdsrSection from '../features/adsrSection';
import useADSR from '../hooks/useADSR';
import { useState } from 'react';

const Main = () => {
    const {
    adsrParams: ampEnv,
    setAttack: setAmpAttack,
    setDecay: setAmpDecay,
    setSustain: setAmpSustain,
    setRelease: setAmpRelease,
  } = useADSR();

  const {
    adsrParams: filterEnv,
    setAttack: setFilterAttack,
    setDecay: setFilterDecay,
    setSustain: setFilterSustain,
    setRelease: setFilterRelease,
  } = useADSR();

  const [volumeAmount, setVolumeAmount] = useState(0.1)
  const {
      setNotes,
      play,
      stopPlaying,
      notes,
      onPitchShiftActive,
      onPitchShiftReleased,
      handleOctaveChange,
      handleTranspose
  } = useAudioLogic({ampEnv, filterEnv, volumeAmount});

    return (
        <>
        <div className='container'>
            <div className='controls-and-noteview-container'>
                <SynthControls 
                transpose={handleTranspose} 
                changeOctave={handleOctaveChange}
                ampControls={{ampEnv, setAmpAttack, setAmpDecay, setAmpRelease, setAmpSustain}}
                filterControls={{filterEnv, setFilterAttack, setFilterDecay, setFilterSustain, setFilterRelease}}
                />
            </div>
            <Synth  play={play} 
                    stopPlaying={stopPlaying} 
                    notes={notes} 
                    setNotes={setNotes}
                    onPitchShiftActive={onPitchShiftActive}
                    onPitchShiftReleased={onPitchShiftReleased}/>
        </div>
        </>
    )
}

export default Main;