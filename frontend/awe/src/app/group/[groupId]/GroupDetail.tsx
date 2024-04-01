'use client'

import ArticleDetailInterface from '@/utils/interfaces/ArticleDetailInterface';
import styles from './GroupDetail.module.scss'
import fetchDataFromServer from '@/utils/fetchDataFromServer';
import Loading from '@/components/loading/Loading';
import Link from 'next/link';


export default function GroupDetail(params: {groupId: string}) {

  const { data, error, isLoading } = 
    fetchDataFromServer<ArticleDetailInterface[]>(
      '/api/articles/group/' + params.groupId
    );

  return (
    <div className={styles.GroupDetail}>
      {isLoading &&
        <Loading />
      }
      {data &&
        data.map((obj, index) => (
          <div key={ index } className={styles.articleItem}>
            <Link href={"/article/" + obj.fire_id}>
              <h3>{ obj.name }</h3>
            </Link>
          </div>
        ))
      }
    </div>
  )
}