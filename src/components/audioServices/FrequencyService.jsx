export function handlePitchShiftUp(ctx, osc){
    const baseFreq = osc.frequency.value;
    const interval = Math.pow(2, 2 / 12);
    osc.frequency.linearRampToValueAtTime(baseFreq * interval, ctx.currentTime + 0.15)
}

export function handlePitchShiftDown(ctx, osc, originalFreq){
    osc.frequency.linearRampToValueAtTime(originalFreq, ctx.currentTime + 0.15)
}