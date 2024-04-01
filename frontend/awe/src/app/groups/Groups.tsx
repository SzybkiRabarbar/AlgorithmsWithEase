'use client'

import GroupsDataInterface from '@/utils/interfaces/GroupsDataInterface';
import styles from './Groups.module.scss';
import fetchDataFromServer from '@/utils/fetchDataFromServer';
import Loading from '@/components/loading/Loading';
import Link from 'next/link';


export default function Groups() {

  const {data: groupsData, error: groupsError, isLoading: groupsIsLoading} = 
    fetchDataFromServer<GroupsDataInterface>('/api/groups/');

  return (
    <div className={styles.Groups}>
      {groupsIsLoading && <Loading />}
      {groupsData && (
        <>
          {Array.isArray(groupsData.groups) &&
            groupsData.groups.map((obj, index) => (
              <div key={ index } className={styles.groupItem}>
                <Link href={"/group/" + obj.id}>
                  <h3>{ obj.name }</h3>
                </Link>
              </div>
            ))
          }
        </>
      )}
    </div>
  );
}