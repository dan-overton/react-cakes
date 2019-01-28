import { Action, combineReducers } from "redux";
import { CakesState, initialCakesState, cakesReducer, } from "./cakes";
import { CakeState, cakeReducer, initialCakeState } from "./cake";
import { AddCakeState, initialAddCakeState, addCakeReducer } from "./add-cake";

export interface CakesAppState {
    cakes: CakesState;
    cake: CakeState;
    add: AddCakeState;
}

export const initialAppState: CakesAppState = {
    cakes: initialCakesState,
    cake: initialCakeState,
    add: initialAddCakeState
}

export const appReducer = combineReducers({cake: cakeReducer, cakes: cakesReducer, add: addCakeReducer})