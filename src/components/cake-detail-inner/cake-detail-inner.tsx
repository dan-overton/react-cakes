import { Breadcrumb, BreadcrumbItem, Tile } from 'bloomer';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Cake } from '../../models';
import CakeImage from '../cake-image/cake-image';

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
                        <CakeImage src={cake.imageUrl} />
                    )
                } />
            </Tile>
            <Tile isParent>
                <Tile isChild render={
                    () => (
                        <div>
                            <p>Name: {cake.name}</p>
                            <p>Comment: {cake.comment}</p>
                            <p>Yum Factor: {cake.yumFactor}</p>
                        </div>
                    )
                } />
            </Tile>
        </Tile>
    </div>);
}

export default CakeDetailInner;