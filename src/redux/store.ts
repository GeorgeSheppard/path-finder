import { createStore } from "redux";
import { hexagonStateReducer } from './reducer';

const initialState = {};

export const store = createStore(hexagonStateReducer, initialState);