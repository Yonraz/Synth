const keys = [
    {
        id: 'c4',
        note: 'C',
        isPressed: false,
        frequency: 261.63,
    },
    {
        id: 'c#4',
        note: 'C#',
        isPressed: false,
        frequency: 277.18,
    },
    {
        id: 'd4',
        note: 'D',
        isPressed: false,
        frequency: 293.66,
    },
    {
        id: 'd#4',
        note: 'D#',
        isPressed: false,
        frequency: 311.13,
    },
    {
        id: 'e4',
        note: 'E',
        isPressed: false,
        frequency: 329.63,
    },
    {
        id: 'f4',
        note: 'F',
        isPressed: false,
        frequency: 349.23,
    },
    {
        id: 'f#4',
        note: 'F#',
        isPressed: false,
        frequency: 369.99,
    },
    {
        id: 'g4',
        note: 'G',
        isPressed: false,
        frequency: 392.00,
    },
    {
        id: 'g#4',
        note: 'G#',
        isPressed: false,
        frequency: 415.30,
    },
    {
        id: 'a4',
        note: 'A',
        isPressed: false,
        frequency: 440.00,
    },
    {
        id: 'a#4',
        note: 'A#',
        isPressed: false,
        frequency: 466.16,
    },
    {
        id: 'b4',
        note: 'B',
        isPressed: false,
        frequency: 493.88,
    },
    {
        id: 'c5',
        note: 'C',
        isPressed: false,
        frequency: 523.25,
    },
    {
        id: 'c#5',
        note: 'C#',
        isPressed: false,
        frequency: 554.37,
    },
    {
        id: 'd5',
        note: 'D',
        isPressed: false,
        frequency: 587.33,
    }
]

function transpose(isUp, notes) {
    const interval = isUp ? Math.pow(2, 1 / 12) : Math.pow(2, -1 / 12);
    return notes.map((key) => {
        return {
            ...key,
            frequency: key.frequency * interval,
        }
    })
}

function changeOctave(isUp, notes) {
    return notes.map((key) => {
        return {
            ...key,
            frequency: isUp ? key.frequency * 2 : key.frequency / 2,
        }
    })
}

const keysToNotesMap = {
        'a': 'c4',
        'w': 'c#4',
        's': 'd4',
        'e': 'd#4',
        'd': 'e4',
        'f': 'f4',
        't': 'f#4',
        'g': 'g4',
        'y': 'g#4',
        'h': 'a4',
        'u': 'a#4',
        'j': 'b4',
        'k': 'c5',
        'o': 'c#5',
        'l': 'd5',
    }

export { keys, transpose, changeOctave, keysToNotesMap };