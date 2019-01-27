import { Action, Dispatch } from "redux";
import { Cake } from "../models";
import CakeService from "../services/cake-service";
import { cakeService } from "../services";

export enum CakeActionTypes {
    GET_CAKE_START = 'GET_CAKE_START',
    GET_CAKE_SUCCESS = 'GET_CAKE_SUCCESS',
    GET_CAKE_ERROR = 'GET_CAKE_ERROR',
};

export interface ActionGetCake extends Action {
    type: CakeActionTypes.GET_CAKE_START,
    id: string
}

export interface ActionGetCakeSuccess extends Action {
    type: CakeActionTypes.GET_CAKE_SUCCESS,
    cake: Cake
}

export interface ActionGetCakeError extends Action {
    type: CakeActionTypes.GET_CAKE_ERROR,
    error?: Error
}

export type CakeActions = ActionGetCake | ActionGetCakeSuccess | ActionGetCakeError;

const dispatchGetCake = (id: string): ActionGetCake => ({ type: CakeActionTypes.GET_CAKE_START, id});
const dispatchGetCakeSuccess = (cake: Cake): ActionGetCakeSuccess => ({ type: CakeActionTypes.GET_CAKE_SUCCESS, cake});
const dispatchGetCakeError = (error: Error): ActionGetCakeError => ({ type: CakeActionTypes.GET_CAKE_ERROR, error});

export function actionGetCake(id: string) {
    return async (dispatch: Dispatch) => {
        dispatch(dispatchGetCake(id));

        try {
            const cake = await cakeService.get(id);
            return dispatch(dispatchGetCakeSuccess(cake));
        }
        catch(error) {
            return dispatch(dispatchGetCakeError(error));
        }
    
    }
}