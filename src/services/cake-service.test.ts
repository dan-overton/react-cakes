import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CakeService from './cake-service';
import { Cake } from '../models';

const mockAxios = new MockAdapter(axios);

describe('CakeService', () => {
    const service = new CakeService();

    describe('getAll', () => {
        it('gets the data from the cakes endpoint', async () => {
            const cakes: Cake[] = [{id: '123'} as Cake];
            mockAxios.onGet(`${service.rootUrl}/cakes`).reply(200, cakes)

            const result = await service.getAll();

            expect(result).toEqual(cakes);
        });
    })

    describe('get', () => {
        it('gets the data from the get endpoint for the passed id', async () => {
            const id = '12314';
            const cake: Cake = {id: '12314'} as Cake;
            mockAxios.onGet(`${service.rootUrl}/cakes/${id}`).reply(200, cake)

            const result = await service.get(id);

            expect(result).toEqual(cake);
        });
    })

    describe('create', () => {
        it('posts the data to the cakes endpoint', async () => {
            const cake: Cake = {name: 'A'} as Cake;
            const createdCake: Cake = {id: '12314'} as Cake;

            mockAxios.onPost(`${service.rootUrl}/cakes`, cake).reply(201, createdCake);

            const result = await service.create(cake);

            expect(result).toEqual(createdCake);
        });
    })
})