import { Synth } from "tone";
import { watch } from "./watch";
import { LIGHTS, type Note, type NoteLight } from "./light";
import * as Tone from "tone";
import P5 from "p5";

if (process.env.NODE_ENV === "development") watch();

const synth = new Synth().toDestination();

function setup() {
    createCanvas(400, 400);
}

const SIZE = 50;
function draw() {
    background(0);
    for (let i = 0; i < LIGHTS.length; i++) {
        fill(LIGHTS[i].on ? LIGHTS[i].color : "white");
        ellipse(i * SIZE + SIZE * 0.5, 200, SIZE, SIZE);
    }
}

function playNote(note: Note, time: number, now: number) {
    console.log(note, time, now);
    synth.triggerAttackRelease(note, `${time}n`, now);
}

type Verse = { notes: NoteLight[]; speed: number; };
let lastNow = 0;
function playVerse(pattern: Verse) {
    if (lastNow < Tone.now()) lastNow = Tone.now();

    const now = lastNow;
    const reduction = Tone.now();
    pattern.notes.forEach((n, i) => {
        lastNow = now + i * pattern.speed;
        setTimeout(() => LIGHTS[n.color].on = true, 1000 * lastNow - reduction);
        playNote(n.note, 4, lastNow);
        setTimeout(() => LIGHTS[n.color].on = false, 1000 * (lastNow + pattern.speed - reduction));
    });

    lastNow += pattern.speed;
}

function playVerses(patterns: Verse[], times: number = 1) {
    for (let i = 0; i < times; i++) patterns.forEach(playVerse);
}

const Db5: NoteLight = { note: "Db5", color: 0 };
const Bb4: NoteLight = { note: "Bb4", color: 1 };
const F4: NoteLight = { note: "F4", color: 2 };
const F5: NoteLight = { note: "F5", color: 3 };
const C5: NoteLight = { note: "C5", color: 4 };
const E5: NoteLight = { note: "E5", color: 6 };
const Eb5: NoteLight = { note: "Eb5", color: 5 };
const G5: NoteLight = { note: "G5", color: 7 };
const Gb5: NoteLight = { note: "Gb5", color: 8 };

function playUnOwen() {
    const v1: Verse = { notes: [Db5, Bb4, F4, Db5, Bb4, F4], speed: 0.15 };
    const v2: Verse = { notes: [C5, C5, C5], speed: 0.25 };
    const v3: Verse = { notes: [Eb5, Eb5, Eb5], speed: 0.25 };

    const v4: Verse = { notes: [F5, Db5, E5, C5], speed: 0.4 };
    const v5: Verse = { notes: [G5, E5, Eb5, Gb5], speed: 0.4 };
    const v6: Verse = { notes: [G5, E5, Eb5], speed: 0.4 };

    const v7: Verse = { notes: [Bb4, F5, C5, F5, Db5], speed: 0.4 };
    const v8: Verse = { notes: [Eb5, F5], speed: 0.2 };
    const v9: Verse = { notes: [Eb5, G5], speed: 0.4 };

    const intro = [v1, v2, v1, v3];
    const verse = [v4, v5, v4, v6];
    const chorus = [v7, v8, v9];

    playVerses(intro, 2);
    playVerses(verse, 2);
    playVerses(chorus);
}


new P5((p: P5) => {
    p.mouseClicked = playUnOwen;
    p.setup = setup;
    p.draw = draw;
});
