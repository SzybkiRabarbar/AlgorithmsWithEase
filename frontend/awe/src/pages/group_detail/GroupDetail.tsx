import { useEffect, useState } from 'react';
import './GroupDetail.scss'

import { Link, useParams } from 'react-router-dom'
import FetchDataFromServer from '../../utils/FetchDataFromServer';
import ArticleDetailInterface from '../../interfaces/ArticleDetailInterface';

function GroupDetail() {
  const { id } = useParams();
  const [articlesList, setGroupData] = 
    useState<ArticleDetailInterface[] | null>(null);

  useEffect(() =>{
    FetchDataFromServer('/api/articles/group/' + id, setGroupData);
  }, []);

  return (
    <div className='GroupDetail'>
      {articlesList &&
        articlesList.map((obj, index) => (
          <div key={ index } className='article-item'>
            <Link to={"/article/" + obj.fire_id} target='_self'>
              <h3>{ obj.name }</h3>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default GroupDetail