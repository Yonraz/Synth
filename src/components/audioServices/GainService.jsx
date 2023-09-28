var getGainNode = (ctx) => {
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.3;
        gainNode.connect(ctx.destination);
        return gainNode;
    }

var setUpGainNodeEnvelope = (ctx, gainNode, adsr, amount) => {
    const [attack, decay, sustain, release] = adsr;
    const now = ctx.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(amount, now + attack);
    gainNode.gain.linearRampToValueAtTime(sustain, now + decay);
    gainNode.gain.linearRampToValueAtTime(0, now + release);
    return gainNode;
}

    export { getGainNode, setUpGainNodeEnvelope };