'use client'

import styles from './Article.module.scss'
import ArticleContentInterface from '@/utils/interfaces/ArticleContentInterface';
import Loading from '@/components/loading/Loading';
import RenderArticleContent from '@/components/render-article-content/RenderArticleContent';
import fetchDataFromServer from '@/utils/fetchDataFromServer';
import ProgressStatusButton from '@/components/progress-status-button/ProgressStatusButton';


export default function Article(props: {fireId: string}) {

  const { 
      data: articleData,
      error: articleError,
      isLoading: articleIsLoading 
  } = 
    fetchDataFromServer<ArticleContentInterface>(
      '/api/content/article/' + props.fireId
    );

  return (
    <div className={styles.Article}>
      {articleIsLoading &&
        <Loading />
      }
      {articleData && (
        <>
          <ProgressStatusButton 
            isBackButton={true}
            groupId={articleData.group_id}
            type_='articles'
            fireId={props.fireId}
            radiusCorners={ ['SW', 'SE'] }
          />
          <div className={styles.header}>
            <span>{ articleData.title }<hr /></span>
          </div>
          {Object.entries(articleData.content).map((obj, index) => (
            <RenderArticleContent obj={obj[1]} index={index} />
          ))}
          <ProgressStatusButton 
            isBackButton={true}
            groupId={articleData.group_id}
            type_='articles'
            fireId={props.fireId}
            radiusCorners={ ['NW', 'NE'] }
          />
        </>
      )}
      {articleError &&
        <div>TODO</div> // TODO
      }
    </div>
  )
}