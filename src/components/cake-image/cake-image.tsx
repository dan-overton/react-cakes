import React, { useState } from 'react';
import './cake-image.scss';

export interface CakeImageProps {
    src: string;
    cover?: boolean;
}

const CakeImage: React.FunctionComponent<CakeImageProps> = (props: CakeImageProps) => {
    const [errored, setErrored] = useState(false);

    function onError() {
        setErrored(true);
    }

    const { src, cover } = props;
    return (<img className={(cover ? 'cover' : '') + ' ' + (errored ? 'errored-img' : '')} src={errored ? '/not-found.png' : src} onError={!errored ? onError : undefined} />)
}

export default CakeImage;