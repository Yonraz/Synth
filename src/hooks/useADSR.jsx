import {useState} from 'react'


export default function useADSR (initialValue = {
    attack: 0.1, 
    decay: 0.5, 
    sustain: 0.1, 
    release: 0.2
}){
    const [adsrParams, setAdsrParams] = useState(initialValue);

    const setAttack = (attack) => setAdsrParams({ ...adsrParams, attack });
    const setDecay = (decay) => setAdsrParams({ ...adsrParams, decay });
    const setSustain = (sustain) => setAdsrParams({ ...adsrParams, sustain });
    const setRelease = (release) => setAdsrParams({ ...adsrParams, release });

    return {
        adsrParams,
        setAttack,
        setDecay,
        setSustain,
        setRelease,
    }
}