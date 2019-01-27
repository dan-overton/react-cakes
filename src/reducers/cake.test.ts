import { cakeReducer } from "./cake";
import { CakeActionTypes, ActionGetCake, ActionGetCakeSuccess, ActionGetCakeError } from "../actions/cake";
import { Cake } from "../models";

describe('cakeReducer', () => {
    it('should return the initial cake state', () => {
        expect(cakeReducer(undefined, {} as any)).toEqual(
            {
                cake: undefined,
                loading: false
            }
        )
    });

    describe('GET_CAKE_START', () => {
        it('should produce expected state', () => {
            const id = '123';
            const expectedState = {
                cake: undefined,
                loading: true,
                error: undefined
            };

            const action: ActionGetCake = {type: CakeActionTypes.GET_CAKE_START, id};

            expect(cakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cake: {} as Cake,
                loading: false,
                error: new Error('')
            };

            expect(cakeReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('GET_CAKE_SUCCESS', () => {
        it('should produce expected state', () => {
            const cake = {} as Cake;
            const expectedState = {
                loading: false,
                cake,
                error: undefined
            };

            const action: ActionGetCakeSuccess = {type: CakeActionTypes.GET_CAKE_SUCCESS, cake};

            expect(cakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cake: {id: '123'} as Cake,
                loading: false,
            };

            expect(cakeReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('GET_CAKE_ERROR', () => {
        it('should produce expected state', () => {
            const error = new Error('Test Error');
            const expectedState = {
                loading: false,
                cake: undefined,
                error
            };

            const action: ActionGetCakeError = {type: CakeActionTypes.GET_CAKE_ERROR, error};

            expect(cakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                cake: {} as Cake,
                loading: false,
                error: new Error('')
            };

            expect(cakeReducer(previousState, action)).toEqual(expectedState);
        });
    });
})