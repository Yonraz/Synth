/* eslint-disable react/prop-types */
import Knob from '../../components/knob/Knob'
import './AdsrSection.css'
export default function AdsrSection(props) {
    const {adsr, setAttack, setDecay, setSustain, setRelease} = props;

    const {attack, decay, sustain, release} = adsr;

    const handleAttackChange = (value) => {
        setAttack(value/20)
        setTimeout(() => console.log('attack changed', attack), 1000)
    }
    const handleDecayChange = (value) => {
        setDecay(value/10)
    }
    const handleSustainChange = (value) => {
        setSustain(value/10)
    }
    const handleReleaseChange = (value) => {
        setRelease(value/10)
    }
    return (<>
        <div className='knob-container'>
            <div className='knob-section'>
                <Knob value={attack} onChange={handleAttackChange} size={45}/>
                <p>Attack</p>
            </div>
            <div className='knob-section'>
                <Knob value={decay} onChange={handleDecayChange} size={45}/>
                <p>Decay</p>
            </div>
            <div className='knob-section'>
                <Knob value={sustain} onChange={handleSustainChange} size={45}/>
                <p>Sustain</p>
            </div>
            <div className='knob-section'>
                <Knob value={release} onChange={handleReleaseChange} size={45}/>
                <p>Release</p>
            </div>
        </div>
    </>)
}