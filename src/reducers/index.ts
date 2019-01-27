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
/*
export function appReducer(state: CakesAppState = initialAppState, action: Action) {
    return {
        cake:  cakeReducer(state.cake, action),
        cakes: cakesReducer(state.cakes, action),
        create: addCakeReducer(state.add, action)
    }
}*/

export const appReducer = combineReducers({cake: cakeReducer, cakes: cakesReducer, add: addCakeReducer})