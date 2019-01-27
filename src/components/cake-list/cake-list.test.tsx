import React from 'react';
import CakeList from './cake-list';
import { shallow, mount } from 'enzyme';
import { Cake } from '../../models';
import { MemoryRouter } from 'react-router';

describe('cake-list', () => {
    it('renders without crashing', () => {
        shallow(<CakeList cakes={[]}></CakeList>);
    });

    it('renders a CakeListItem for each cake', () => {
        const c1 = {id: '1'} as Cake;
        const cakes = [c1, {id: '2'} as Cake];

        const wrapper = mount(<MemoryRouter><CakeList cakes={cakes} /></MemoryRouter>);
        const items = wrapper.find('.cake-list > .cake-list-grid > CakeListItem');
        expect(items.length).toEqual(2);

        expect(items.get(0).key).toEqual('1');
        expect(items.get(0).props.cake).toEqual(c1);
    });
})



