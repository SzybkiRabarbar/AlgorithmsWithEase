import { useParams } from 'react-router-dom'
import './Article.scss'
import { useEffect, useState } from 'react';
import FetchDataFromServer from '../../utils/FetchDataFromServer';
import ArticleContentInterface from '../../interfaces/ArticleContentInterface';

function Article() {
  const { fire_id } = useParams();
  const [siteContent, setSiteContent] =
    useState<ArticleContentInterface | null>(null);

  useEffect(() => {
    FetchDataFromServer('/api/content/article/' + fire_id, setSiteContent);
  }, [])
    
  return (
    <div className='Article'>
      {siteContent &&
        siteContent.title
      }
    </div>
  )
}

export default Article