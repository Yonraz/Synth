/* eslint-disable react/prop-types */
import { useState } from "react";
import './TransposeSection.css'
const TransposeSection = (props) => {
    const [trspsCount, setTrspsCount] = useState(0);
    const [octaveCount, setOctaveCount] = useState(0);
    const handleTranspose = (isUp) => {
        if (trspsCount === 11 && isUp) return;
        if (trspsCount === -11 && !isUp) return;
        isUp 
        ? setTrspsCount(prev => prev + 1) 
        : setTrspsCount(prev => prev - 1);
        props.transpose(isUp);
    }
    const handleOctave = (isUp) => {
        if (octaveCount === 2 && isUp) return;
        if (octaveCount === -2 && !isUp) return;
        isUp
        ? setOctaveCount(prev => prev + 1)
        : setOctaveCount(prev => prev - 1);
        props.changeOctave(isUp);
    }
    
    return (
        
        <div className="transpose-container">
            <div className="transpose-control">
                <h3>Transpose</h3>
                <button onClick={() => handleTranspose(true)}>+</button>
                <button onClick={() => handleTranspose(false)}>-</button>
                <span className="count">{trspsCount !== 0 ? trspsCount > 0 ? `+${trspsCount}` : trspsCount : ''}</span>
            </div>
            <div className="transpose-control">
                <h3>Octave</h3>
                <button onClick={() => handleOctave(true)}>+</button>
                <button onClick={() => handleOctave(false)}>-</button>
                <span className="count">{octaveCount !== 0 ? octaveCount > 0 ? `+${octaveCount}` : octaveCount : ''}</span>
            </div>
        </div>
    )
}
export default TransposeSection;