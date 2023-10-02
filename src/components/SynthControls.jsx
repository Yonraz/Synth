/* eslint-disable react/prop-types */
import TransposeSection from "./TransposeSection";

const SynthControls = (props) => {
    const {transpose, changeOctave, ampAdsr} = props;
    return (<>
        <TransposeSection transpose={transpose} changeOctave={changeOctave} />
    </>)
}
export default SynthControls;