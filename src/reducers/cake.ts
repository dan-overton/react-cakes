import { Cake } from "../models";
import { CakeActionTypes, CakeActions } from "../actions/cake";

export interface CakeState {
    cake?: Cake;
    loading: boolean;
    error?: Error;
}

export const initialCakeState: CakeState = {
    cake: undefined,
    loading: false
}

export function cakeReducer(state: CakeState = initialCakeState, action: CakeActions): CakeState {
    switch(action.type) {
        case CakeActionTypes.GET_CAKE_START:
            return {
                ...state,
                loading: true,
                error: undefined,
                cake: undefined,
            }
        case CakeActionTypes.GET_CAKE_SUCCESS:
            return {
                ...state,
                loading: false,
                cake: action.cake,
            }
        case CakeActionTypes.GET_CAKE_ERROR:
            return {
                ...state,
                cake: undefined,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}