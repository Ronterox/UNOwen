import type { Note as N } from "tone/build/esm/core/type/NoteUnits";

export type Note = N;

export type Light = {
    on: boolean;
    color: string;
    brightness: number;
};

export type NoteLight = {
    note: Note;
    color: number;
}

export const LIGHTS: Light[] = [{
    on: false,
    color: "red",
    brightness: 0.5,
}, {
    on: false,
    color: "green",
    brightness: 0.5,
}, {
    on: false,
    color: "blue",
    brightness: 0.5,
}, {
    on: false,
    color: "yellow",
    brightness: 0.5,
}, {
    on: false,
    color: "purple",
    brightness: 0.5,
}, {
    on: false,
    color: "orange",
    brightness: 0.5,
}, {
    on: false,
    color: "pink",
    brightness: 0.5,
}, {
    on: false,
    color: "cyan",
    brightness: 0.5,
}, {
    on: false,
    color: "magenta",
    brightness: 0.5,
}];

