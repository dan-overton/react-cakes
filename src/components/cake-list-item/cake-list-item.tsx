import React from 'react';
import './cake-list-item.scss';
import { Cake } from '../../models';
import { Link } from 'react-router-dom';
import CakeImage from '../cake-image/cake-image';

const CakeListItem: React.FunctionComponent<{ cake: Cake }> = (props) => {
    const { cake } = props;
    return (
    <Link to={'cake/' + cake.id}>
        <div className="cake-list-item">
            <CakeImage src={cake.imageUrl}></CakeImage>
            <div className="cake-name-panel">
                <span>{cake.name}</span>
            </div>
        </div>
    </Link>);
}

export default CakeListItem;