import React from 'react';
import CakeImage from './cake-image';
import { shallow, mount } from 'enzyme';

describe('cake-image', () => {
    it('renders without crashing', () => {
        shallow(<CakeImage src={''}></CakeImage>);
    });

    it('renders an img for the cake', () => {
        const src='testSrc';

        const wrapper = mount(<CakeImage src={src}></CakeImage>);
        const img = wrapper.find('img');
        expect(img.length).toEqual(1);

        expect(img.get(0).props.src).toEqual(src);
    });

    it('falls back to an error image if the image fails to load', () => {
        const src='testSrc';
        const wrapper = shallow(<CakeImage src={src}></CakeImage>);
        const cakeImage = wrapper.instance() as CakeImage;
        cakeImage.onError();

        expect(cakeImage.state.errored).toEqual(true);

        const img = wrapper.find('img');

        expect(img.hasClass('errored-img')).toEqual(true);
        expect(img.get(0).props.src).toEqual('/not-found.png');
    });
})



