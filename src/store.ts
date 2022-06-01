import { writable } from 'svelte/store';
import type D3 from './3d';

export const dayNight = writable<string>(localStorage.getItem('dayNight') || '')
dayNight.subscribe(up => up ? localStorage.setItem("dayNight", up) : localStorage.removeItem('dayNight'))

export const errors = writable<string[]>([])

export const d3 = writable<D3>()

export const pitch = writable<number>((+localStorage.getItem('pitch')))
pitch.subscribe(up => localStorage.setItem("pitch", '' + up))
