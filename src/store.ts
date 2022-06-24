import { writable } from 'svelte/store';
import type D3 from './3d';

export const daynight = writable<string>(localStorage.getItem('daynight') || '')
daynight.subscribe(up => up ? localStorage.setItem("daynight", up) : localStorage.removeItem('daynight'))

export const errors = writable<string[]>([])

export const d3 = writable<D3>()

export const pitch = writable<number>((+localStorage.getItem('pitch')))
pitch.subscribe(up => localStorage.setItem("pitch", '' + up))
