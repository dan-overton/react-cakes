import { Cake } from "../models";
import { CakesActionTypes, CakesActions } from "../actions/cakes";

export interface CakesState {
    cakes: Cake[];
    loading: boolean;
    error?: Error;
}

export const initialCakesState: CakesState = {
    cakes: [],
    loading: false
}

export function cakesReducer(state: CakesState = initialCakesState, action: CakesActions): CakesState {
    switch(action.type) {
        case CakesActionTypes.GET_CAKES_START:
            return {
                ...state,
                loading: true,
                cakes: [],
                error: undefined
            }
        case CakesActionTypes.GET_CAKES_SUCCESS:
            return {
                ...state,
                loading: false,
                cakes: action.cakes,
                error: undefined
            }
        case CakesActionTypes.GET_CAKES_ERROR:
            return {
                ...state,
                cakes: [],
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}