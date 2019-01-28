import React, { Component } from 'react';
import './cake-image.scss';

export interface CakeImageProps {
    src: string;
    cover?: boolean;
}

export interface CakeImageState {
    errored: boolean;
}

class CakeImage extends Component<CakeImageProps, CakeImageState> {
    constructor(props: CakeImageProps) {
        super(props);
        this.state = { errored: false };
    }

    onError = () => this.setState({ errored: true });

    render() {
        const { errored } = this.state;
        const { src, cover } = this.props;
        return (<img className={(cover ? 'cover' : '') + ' ' + (errored ? 'errored-img' : '')} src={errored ? '/not-found.png' : src} onError={!errored ? this.onError : undefined} />)
    }
}

export default CakeImage;