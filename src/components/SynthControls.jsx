/* eslint-disable react/prop-types */
import TransposeSection from "./TransposeSection";
import AdsrSection from "../features/adsrSection";
import './SynthControls.css'

const SynthControls = (props) => {
    const {transpose, changeOctave, ampControls, filterControls} = props;
    const {ampEnv, setAmpAttack, setAmpDecay, setAmpSustain, setAmpRelease} = ampControls
    const {filterEnv, setFilterAttack, setFilterDecay, setFilterSustain, setFilterRelease} = filterControls
    return (<>
        <TransposeSection transpose={transpose} changeOctave={changeOctave} />
        <div className="adsr-container">
            <AdsrSection  type='amp' 
                        adsr={ampEnv}
                        setAttack={setAmpAttack}
                        setDecay={setAmpDecay}
                        setSustain={setAmpSustain}
                        setRelease={setAmpRelease}
                        className='adsr-section'
                        />
            <AdsrSection  type='filter' 
                        adsr={filterEnv}
                        setAttack={setFilterAttack}
                        setDecay={setFilterDecay}
                        setSustain={setFilterSustain}
                        setRelease={setFilterRelease}
                        className='adsr-section' />
        </div>
    </>)
}
export default SynthControls;