import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { cakeService } from '../services';
import { Cake } from '../models';
import { CakesActionTypes, actionGetCakes } from './cakes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actionGetCakes', () => {
    const cakes: Cake[] = [{
        id: '123',
        name: 'testCake',
        comment: 'testCakeComment',
        yumFactor: 4,
        imageUrl: 'http://website.com/image.jpg'
    }];

    it('creates GET_CAKES_SUCCESS when cakes retrieved successfully', () => {
        cakeService.getAll = jest.fn(() => Promise.resolve(cakes))

        const expectedActions = [
            { type: CakesActionTypes.GET_CAKES_START },
            { type: CakesActionTypes.GET_CAKES_SUCCESS, cakes }
        ]
        const store = mockStore({ cakes: [] })

        return store.dispatch(actionGetCakes() as any).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    })

    it('creates GET_CAKES_ERROR when cakes fetch fails', () => {
        const error = new Error('Test Error');
        cakeService.getAll = jest.fn(() => Promise.reject(error))

        const expectedActions = [
            { type: CakesActionTypes.GET_CAKES_START },
            { type: CakesActionTypes.GET_CAKES_ERROR, error }
        ]
        const store = mockStore({ cakes: [] })

        return store.dispatch(actionGetCakes() as any).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    })
})