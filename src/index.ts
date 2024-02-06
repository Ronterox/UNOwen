import { Synth } from "tone";
import { watch } from "./watch";
import type { Note } from "tone/build/esm/core/type/NoteUnits";
import P5 from "p5";

watch();

const synth = new Synth().toDestination();
let x = 50, y = 50;
const speed = 3;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
    ellipse(x, y, 50, 50);
    x += speed;
    y += speed;
    if (x > width) x = 0;
    if (y > height) y = 0;
}

// Un Owen Was Her
// Db4, Bb4, F4
// Db4, Bb4, F4

function playNote(note: Note, time: number, delay: number) {
    console.log(note, time, delay);
    synth.triggerAttackRelease(note, `${time}n`, delay ? `+${delay}n` : undefined);
}

new P5((p: P5) => {
    p.mouseClicked = () => {
        const song: Note[] = [
            "Db5", "Bb4", "F4",
            // "Db5", "Bb4", "F4",
        ];
        const noteType = 8;
        song.forEach((note, i) => { playNote(note, noteType, i * noteType); });
    }
    p.setup = setup;
    p.draw = draw;
});
