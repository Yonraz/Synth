/* eslint-disable react/prop-types */
const SynthKey = (props) => {
    const isBlackKey =  props.note.includes('#');
    const className = isBlackKey ? `black-key ${props.note}` : `white-key ${props.note}`;
   
    return (
        <>
            <li onMouseDown={props.handleMouseDown} 
                onMouseUp={props.handleMouseUp}
                id={props.id} className={props.isPressed ? `key-pressed ${className}` : `${className}`}>
            </li>
        </>
    )
}
export default SynthKey;