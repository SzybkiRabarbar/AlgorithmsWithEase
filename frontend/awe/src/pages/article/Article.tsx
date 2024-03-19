import { useParams } from 'react-router-dom'
import './Article.scss'
import { useEffect, useState } from 'react';
import FetchDataFromServer from '../../utils/FetchDataFromServer';
import ArticleContentInterface from '../../interfaces/ArticleContentInterface';
import GenereteArticleDiv from '../../components/generating_articles/GenerateArticleDiv';
import Loading from '../../components/loading/Loading';
import ButtonsInArticle from '../../components/buttons_in_article/ButtonsInArticle';

function Article() {
  const { fire_id } = useParams();
  const [siteContent, setSiteContent] =
    useState<ArticleContentInterface | null>(null);
  
  useEffect(() => {
    FetchDataFromServer('/api/content/article/' + fire_id, setSiteContent);
  }, [])
    
  return (
    <div className='Article'>
      {siteContent === null &&
        <Loading />
      }
      {siteContent && fire_id && (
        <>
          <ButtonsInArticle position={'up'}
            group_id={siteContent.group_id} fire_id={fire_id}/>
          <div className='header'>
            <span>{ siteContent.title }<hr /></span>
          </div>
          {Object.entries(siteContent.content).map((obj, index) => (
            <GenereteArticleDiv obj={obj[1]} index={index} />
          ))}
          <ButtonsInArticle position={'down'}
            group_id={siteContent.group_id} fire_id={fire_id}/>
        </>
      )}
    </div>
  )
}

export default Article