import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { cakeService } from '../services';
import { Cake } from '../models';
import { CakeActionTypes, actionGetCake } from './cake';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actionGetCake', () => {
    const cake: Cake = {
        id: '123',
        name: 'testCake',
        comment: 'testCakeComment',
        yumFactor: 4,
        imageUrl: 'http://website.com/image.jpg'
    };

  it('creates GET_CAKE_SUCCESS when cake retrieved successfully', () => {
    const id = '123';
    cakeService.get = jest.fn(() => Promise.resolve(cake))

    const expectedActions = [
      { type: CakeActionTypes.GET_CAKE_START, id },
      { type: CakeActionTypes.GET_CAKE_SUCCESS, cake }
    ]
    const store = mockStore({ cakes: [] })

    return store.dispatch(actionGetCake(id) as any).then(() => {
      expect(cakeService.get).toHaveBeenCalledWith(id);
      expect(store.getActions()).toEqual(expectedActions)
    });
  })

  it('creates GET_CAKES_ERROR when cakes fetch fails', () => {
    const id = '456';
    const error = new Error('Test Error');
    cakeService.get = jest.fn(() => Promise.reject(error))

    const expectedActions = [
      { type: CakeActionTypes.GET_CAKE_START, id },
      { type: CakeActionTypes.GET_CAKE_ERROR, error }
    ]
    const store = mockStore({ cakes: [] })

    return store.dispatch(actionGetCake(id) as any).then(() => {
      expect(cakeService.get).toHaveBeenCalledWith(id);
      expect(store.getActions()).toEqual(expectedActions)
    });
  })
})