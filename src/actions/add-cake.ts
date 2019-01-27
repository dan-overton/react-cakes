import { Action, Dispatch } from "redux";
import { Cake } from "../models";
import CakeService from "../services/cake-service";
import { cakeService } from "../services";

export enum AddCakeActionTypes {
    ADD_CAKE_START = 'ADD_CAKE_START',
    ADD_CAKE_SUCCESS = 'ADD_CAKE_SUCCESS',
    ADD_CAKE_ERROR = 'ADD_CAKE_ERROR',
    ADD_CAKE_RESET = 'ADD_CAKE_RESET',
};

export interface ActionAddCake extends Action {
    type: AddCakeActionTypes.ADD_CAKE_START,
}

export interface ActionAddCakeSuccess extends Action {
    type: AddCakeActionTypes.ADD_CAKE_SUCCESS,
    cake: Cake
}

export interface ActionAddCakeError extends Action {
    type: AddCakeActionTypes.ADD_CAKE_ERROR,
    error?: Error
}

export interface ActionAddCakeReset extends Action {
    type: AddCakeActionTypes.ADD_CAKE_RESET
}

export type AddCakeActions = ActionAddCake | ActionAddCakeSuccess | ActionAddCakeError | ActionAddCakeReset;

const dispatchAddCake = (): ActionAddCake => ({ type: AddCakeActionTypes.ADD_CAKE_START});
const dispatchAddCakeSuccess = (cake: Cake): ActionAddCakeSuccess => ({ type: AddCakeActionTypes.ADD_CAKE_SUCCESS, cake});
const dispatchAddCakeError = (error: Error): ActionAddCakeError => ({ type: AddCakeActionTypes.ADD_CAKE_ERROR, error});
const dispatchAddCakeReset = (): ActionAddCakeReset => ({ type: AddCakeActionTypes.ADD_CAKE_RESET});

export function actionAddCake(cake: Cake) {
    return async (dispatch: Dispatch) => {
        dispatch(dispatchAddCake());

        try {
            await cakeService.create(cake);
            return dispatch(dispatchAddCakeSuccess(cake));
        }
        catch(error) {
            return dispatch(dispatchAddCakeError(error));
        }
    
    }
}

export function actionAddCakeReset() {
    return (dispatch: Dispatch) => {dispatch(dispatchAddCakeReset());};
}