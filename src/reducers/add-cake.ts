import { AddCakeActionTypes, AddCakeActions } from "../actions/add-cake";

export interface AddCakeState {
    loading: boolean;
    succeeded: boolean;
    error?: Error;
}

export const initialAddCakeState: AddCakeState = {
    loading: false,
    succeeded: false
}

export function addCakeReducer(state: AddCakeState = initialAddCakeState, action: AddCakeActions): AddCakeState {
    switch (action.type) {
        case AddCakeActionTypes.ADD_CAKE_START:
            return {
                ...state,
                succeeded: false,
                loading: true,
                error: undefined,
            }
        case AddCakeActionTypes.ADD_CAKE_SUCCESS:
            return {
                ...state,
                succeeded: true,
                loading: false,
            }
        case AddCakeActionTypes.ADD_CAKE_ERROR:
            return {
                ...state,
                succeeded: false,
                loading: false,
                error: action.error
            }
        case AddCakeActionTypes.ADD_CAKE_RESET:
            return {
                ...state,
                succeeded: false,
                loading: false,
                error: undefined
            }
        default:
            return state;
    }
}