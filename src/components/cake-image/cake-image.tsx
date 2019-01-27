import React, { Component } from 'react';

export interface CakeImageProps {
    src: string;
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
        const { src } = this.props;
        return (<img src={errored ? '/not-found.png' : src} onError={!errored ? this.onError : undefined} />)
    }
}

export default CakeImage;