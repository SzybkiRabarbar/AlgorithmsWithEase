import './Groups.scss';

import GroupsDataInterface from '../../interfaces/GroupsDataInterface';

function Groups(props: { groupsData: GroupsDataInterface; }) {
  const groupsData = props.groupsData;

  return (
    <div className='Groups'>
      {Array.isArray(groupsData.groups) &&
      groupsData.groups.map(obj => [obj.id, obj.name])
      }
    </div>
  );
}

export default Groups;
