import { Action, Dispatch } from "redux";
import { Cake } from "../models";
import CakeService from "../services/cake-service";

export enum CakesActionTypes {
    GET_CAKES_START = 'GET_CAKES_START',
    GET_CAKES_SUCCESS = 'GET_CAKES_SUCCESS',
    GET_CAKES_ERROR = 'GET_CAKES_ERROR',
};

export interface ActionGetCakes extends Action {
    type: CakesActionTypes.GET_CAKES_START
}

export interface ActionGetCakesSuccess extends Action {
    type: CakesActionTypes.GET_CAKES_SUCCESS,
    cakes: Cake[]
}

export interface ActionGetCakesError extends Action {
    type: CakesActionTypes.GET_CAKES_ERROR,
    error: Error
}

export type CakesActions = ActionGetCakes | ActionGetCakesSuccess | ActionGetCakesError;

const cakeService = new CakeService();

const dispatchGetCakes = (): ActionGetCakes => ({ type: CakesActionTypes.GET_CAKES_START});
const dispatchGetCakesSuccess = (cakes: Cake[]): ActionGetCakesSuccess => ({ type: CakesActionTypes.GET_CAKES_SUCCESS, cakes});
const dispatchGetCakesError = (error: Error): ActionGetCakesError => ({ type: CakesActionTypes.GET_CAKES_ERROR, error});

export function actionGetCakes() {
    return async (dispatch: Dispatch) => {
        dispatch(dispatchGetCakes());

        try {
            const cakes = await cakeService.getAll();
            return dispatch(dispatchGetCakesSuccess(cakes));
        }
        catch(error) {
            return dispatch(dispatchGetCakesError(error));
        }
    
    }
}