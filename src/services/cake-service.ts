import axios from 'axios';
import { Cake } from '../models';

export default class CakeService {
    readonly rootUrl = 'http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api';

    getAll = async () => {
        const resp = await axios.get<Cake[]>(`${this.rootUrl}/cakes`);
        return resp.data;
    }

    get = async (id: string) => {
        const resp = await axios.get<Cake>(`${this.rootUrl}/cakes/${id}`);
        return resp.data;
    }

    create = async (cake: Cake) => {
        const resp = await axios.post<Cake>(`${this.rootUrl}/cakes`, cake);
        return resp.data;
    }
}