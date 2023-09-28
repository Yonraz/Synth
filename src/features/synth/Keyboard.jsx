/* eslint-disable react/prop-types */
import SynthKey from './SynthKey';
import '../../styles/SynthKey.css';
const Keyboard = (props) => {
    const {keys, handleMouseDown, handleMouseUp} = props;
    return (
        <>
            <div className='keys-container'>
                <ul >
                    {keys && keys.map((k) => 
                            <SynthKey id={k.id}  key={k.id}
                            note={k.note} 
                            isPressed={k.isPressed}
                            handleMouseDown={() => handleMouseDown(k)}
                            handleMouseUp={() => handleMouseUp(k)}
                            />
                    )}
                </ul>
            </div>
        </>
    )
}
export default Keyboard;