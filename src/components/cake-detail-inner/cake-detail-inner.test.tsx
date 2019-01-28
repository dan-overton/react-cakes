import React from 'react';
import CakeDetailInner from './cake-detail-inner';
import { shallow, mount } from 'enzyme';
import { Cake } from '../../models';
import { MemoryRouter } from 'react-router';

describe('cake-detail-inner', () => {
    const cake: Cake = {
        id: '123',
        name: 'cake',
        imageUrl: 'http://someurl',
        comment: 'test',
        yumFactor: 1
    };

    it('renders without crashing', () => {
        shallow(<CakeDetailInner cake={cake}></CakeDetailInner>);
    });

    it('renders a CakeImage', () => {
        const wrapper = mount(<MemoryRouter><CakeDetailInner cake={cake} /></MemoryRouter>);
        const items = wrapper.find('CakeImage');
        expect(items.length).toEqual(1);

        expect(items.get(0).props.src).toEqual(cake.imageUrl);
    });

    it('renders a panel with info on the cake', () => {
        const wrapper = mount(<MemoryRouter><CakeDetailInner cake={cake} /></MemoryRouter>);
        const items = wrapper.find('div.cake-detail-info');
        expect(items.length).toEqual(1);

        expect(items.find('p.cake-name').text()).toEqual('Name: cake');
        expect(items.find('p.cake-comment').text()).toEqual('Comment: test');
        expect(items.find('p.cake-yumfactor').text()).toEqual('Yum Factor: 1');
        
    });
})



