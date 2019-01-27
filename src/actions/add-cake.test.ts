import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { cakeService } from '../services';
import { Cake } from '../models';
import { AddCakeActionTypes, actionAddCake, actionAddCakeReset } from './add-cake';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actionAddCake', () => {
  const cake: Cake = {
    name: 'testCake',
    comment: 'testCakeComment',
    yumFactor: 4,
    imageUrl: 'http://website.com/image.jpg'
  };

  it('creates ADD_CAKE_SUCCESS when cake added successfully', () => {
    cakeService.create = jest.fn(() => Promise.resolve(cake))

    const expectedActions = [
      { type: AddCakeActionTypes.ADD_CAKE_START },
      { type: AddCakeActionTypes.ADD_CAKE_SUCCESS, cake }
    ]
    const store = mockStore({ cakes: [] })

    return store.dispatch(actionAddCake(cake) as any).then(() => {
      expect(cakeService.create).toHaveBeenCalledWith(cake);
      expect(store.getActions()).toEqual(expectedActions)
    });
  })

  it('creates ADD_CAKE_ERROR when cakes fetch fails', () => {
    const error = new Error('Test Error');
    cakeService.create = jest.fn(() => Promise.reject(error))

    const expectedActions = [
      { type: AddCakeActionTypes.ADD_CAKE_START },
      { type: AddCakeActionTypes.ADD_CAKE_ERROR, error }
    ]
    const store = mockStore({ cakes: [] })

    return store.dispatch(actionAddCake(cake) as any).then(() => {
      expect(cakeService.create).toHaveBeenCalledWith(cake);
      expect(store.getActions()).toEqual(expectedActions)
    });
  })
})

describe('actionAddCakeReset', () => {

  it('creates ADD_CAKE_RESET when called', () => {
    const expectedActions = [
      { type: AddCakeActionTypes.ADD_CAKE_RESET },
    ]
    const store = mockStore({ cakes: [] })

    store.dispatch(actionAddCakeReset() as any)
    expect(store.getActions()).toEqual(expectedActions)
  })
})