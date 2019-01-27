import React from 'react';
import './cake-list.scss';
import { Cake } from '../../models';
import CakeListItem from '../cake-list-item/cake-list-item';

interface CakeListProps {
    cakes: Cake[];
}

const CakeList: React.FunctionComponent<CakeListProps> = (props) => {
  const {cakes} = props;

  return (
    <div className="cake-list">
      <div className="cake-list-grid">
          {cakes.map(c => <CakeListItem key={c.id} cake={c}></CakeListItem>)}
      </div>
    </div>
  );
}

export default CakeList;
