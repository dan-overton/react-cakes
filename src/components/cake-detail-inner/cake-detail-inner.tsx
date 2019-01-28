import { Breadcrumb, BreadcrumbItem, Tile } from 'bloomer';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from '../../models';
import CakeImage from '../cake-image/cake-image';
import './cake-detail-inner.scss';

export interface CakeDetailInnerProps {
    cake: Cake;
}

const CakeDetailInner: FunctionComponent<CakeDetailInnerProps> = (props) => {
    const { cake } = props;

    return (<div>
        <Breadcrumb>
            <ul>
                <BreadcrumbItem><Link to="/">Cakes</Link></BreadcrumbItem>
                <BreadcrumbItem>&nbsp;{cake.name}</BreadcrumbItem>
            </ul>
        </Breadcrumb>
        <Tile isAncestor>
            <Tile isSize={6} isVertical isParent>
                <Tile isChild render={
                    () => (
                        <div className="cake-detail-container has-text-centered"><CakeImage src={cake.imageUrl} /></div>
                    )
                } />
            </Tile>
            <Tile isParent>
                <Tile isChild render={
                    () => (
                        <div className="cake-detail-info"> 
                            <p className="cake-name">Name: {cake.name}</p>
                            <p className="cake-comment">Comment: {cake.comment}</p>
                            <p className="cake-yumfactor">Yum Factor: {cake.yumFactor}</p>
                        </div>
                    )
                } />
            </Tile>
        </Tile>
    </div>);
}

export default CakeDetailInner;