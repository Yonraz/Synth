import useADSR from '../../hooks/useADSR';

export default function AmpEnvelope(){
    const {adsrParams, setAttack, setDecay, setSustain, setRelease} = useADSR();
    const {attack, decay, sustain, release} = adsrParams;

    function handleAttackChange(value){
        setAttack(value);
    }
    function handleDecayChange(value){
        setDecay(value);
    }
    function handleSustainChange(value){
        setSustain(value);
    }
    function handleReleaseChange(value){
        setRelease(value)
    }
}