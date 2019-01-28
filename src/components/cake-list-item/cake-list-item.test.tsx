import React from 'react';
import CakeListItem from './cake-list-item';
import { shallow, mount } from 'enzyme';
import { Cake } from '../../models';
import { MemoryRouter } from 'react-router';

describe('cake-list-item', () => {
    const cake: Cake = {
        id: '123',
        name: 'cake',
        imageUrl: 'http://someurl',
        comment: 'test',
        yumFactor: 1
    };

    it('renders without crashing', () => {
        shallow(<CakeListItem cake={cake}></CakeListItem>);
    });

    it('renders a link to the cake detail page', () => {
        const wrapper = mount(<MemoryRouter><CakeListItem cake={cake} /></MemoryRouter>);
        const items = wrapper.find('Link');
        expect(items.length).toEqual(1);

        expect(items.get(0).props.to).toEqual('cake/123');
    });

    it('renders a CakeImage', () => {
        const wrapper = mount(<MemoryRouter><CakeListItem cake={cake} /></MemoryRouter>);
        const items = wrapper.find('.cake-list-item > CakeImage');
        expect(items.length).toEqual(1);

        expect(items.get(0).props.src).toEqual(cake.imageUrl);
        expect(items.get(0).props.cover).toEqual(true);
    });

    it('renders a panel with the name of the cake', () => {
        const wrapper = mount(<MemoryRouter><CakeListItem cake={cake} /></MemoryRouter>);
        const items = wrapper.find('.cake-list-item > .cake-name-panel > span');
        
        expect(items.getDOMNode().textContent).toEqual(cake.name);
    });
})



