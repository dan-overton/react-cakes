import { addCakeReducer } from "./add-cake";
import { AddCakeActionTypes, ActionAddCake, ActionAddCakeSuccess, ActionAddCakeError } from "../actions/add-cake";
import { Cake } from "../models";

describe('addCakeReducer', () => {
    it('should return the initial add cake state', () => {
        expect(addCakeReducer(undefined, {} as any)).toEqual(
            {
                succeeded: false,
                loading: false
            }
        )
    });

    describe('ADD_CAKE_START', () => {
        it('should produce expected state', () => {
            const expectedState = {
                succeeded: false,
                loading: true,
                error: undefined
            };

            const action: ActionAddCake = {type: AddCakeActionTypes.ADD_CAKE_START};

            expect(addCakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                succeeded: true,
                loading: false,
                error: new Error('')
            };

            expect(addCakeReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('ADD_CAKE_SUCCESS', () => {
        it('should produce expected state', () => {
            const cake = {} as Cake;
            const expectedState = {
                loading: false,
                succeeded: true,
                error: undefined
            };

            const action: ActionAddCakeSuccess = {type: AddCakeActionTypes.ADD_CAKE_SUCCESS, cake};

            expect(addCakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                loading: false,
                succeeded: true,
                error: undefined
            };

            expect(addCakeReducer(previousState, action)).toEqual(expectedState);
        });
    });

    describe('ADD_CAKE_ERROR', () => {
        it('should produce expected state', () => {
            const error = new Error('Test Error');
            const expectedState = {
                loading: false,
                succeeded: false,
                error
            };

            const action: ActionAddCakeError = {type: AddCakeActionTypes.ADD_CAKE_ERROR, error};

            expect(addCakeReducer(undefined, action)).toEqual(expectedState);

            const previousState = {
                loading: true,
                succeeded: true,
                error: new Error('')
            };

            expect(addCakeReducer(previousState, action)).toEqual(expectedState);
        });
    });
})