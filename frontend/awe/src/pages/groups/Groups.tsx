import './Groups.scss';

import GroupsDataInterface from '../../interfaces/GroupsDataInterface';
import { Link } from 'react-router-dom';

function Groups(props: { groupsData: GroupsDataInterface; }) {
  const groupsData = props.groupsData;

  return (
    <div className='Groups'>
      {Array.isArray(groupsData.groups) &&
      groupsData.groups.map((obj, index) => (
        <div key={ index } className='group-item'>
          <Link to={"/group/" + obj.id} target='_self'>
            <h3>{ obj.name }</h3>
          </Link>
        </div>
      ))
      }
    </div>
  );
}

export default Groups;
