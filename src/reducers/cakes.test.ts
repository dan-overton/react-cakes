import { cakesReducer } from "./cakes";
import { CakesActionTypes, ActionGetCakes, ActionGetCakesSuccess, ActionGetCakesError } from "../actions/cakes";
import { Cake } from "../models";

describe('cakesReducer', () => {
    it('should return the initial cakes state', () => {
        expect(cakesReducer(undefined, {} as any)).toEqual(
            {
                cakes: [],
                loading: false
            }
        )
    });

    describe('GET_CAKES_START', () => {
        it('should produce expected state', () => {
            const expectedState = {
                cakes: [],
                loading: true,
                error: undefined
            };

            const action: ActionGetCakes = {type: CakesActionTypes.GET_CAKES_START};

            expect(cakesReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cakes: [{} as Cake],
                loading: false,
                error: new Error('')
            };

            expect(cakesReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('GET_CAKES_SUCCESS', () => {
        it('should produce expected state', () => {
            const cakes: Cake[] = [{} as Cake, {} as Cake];
            const expectedState = {
                loading: false,
                cakes,
                error: undefined
            };

            const action: ActionGetCakesSuccess = {type: CakesActionTypes.GET_CAKES_SUCCESS, cakes};

            expect(cakesReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cakes: [{} as Cake],
                loading: false,
                error: new Error('')
            };

            expect(cakesReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('GET_CAKES_ERROR', () => {
        it('should produce expected state', () => {
            const error = new Error('Test Error');
            const expectedState = {
                loading: false,
                cakes: [],
                error
            };

            const action: ActionGetCakesError = {type: CakesActionTypes.GET_CAKES_ERROR, error};

            expect(cakesReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cakes: [{} as Cake],
                loading: false,
                error: new Error('')
            };

            expect(cakesReducer(previousState, action)).toEqual(expectedState);
        });
    });
})