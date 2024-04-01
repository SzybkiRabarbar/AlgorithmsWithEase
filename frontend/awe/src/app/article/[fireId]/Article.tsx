'use client'

import styles from './Article.module.scss'
import ArticleContentInterface from '@/utils/interfaces/ArticleContentInterface';
import Loading from '@/components/loading/Loading';
import ButtonsInArticle from '@/components/article-functional-buttons/ArticleFunctionalButtons';
import RenderArticleContent from '@/components/render-article-content/RenderArticleContent';
import fetchDataFromServer from '@/utils/fetchDataFromServer';


export default function Article(params: {fireId: string}) {

  const { data, error, isLoading } = 
    fetchDataFromServer<ArticleContentInterface>(
      '/api/content/article/' + params.fireId
    );

  return (
    <div className={styles.Article}>
      {isLoading &&
        <Loading />
      }
      {data && (
        <>
          <ButtonsInArticle position={'up'}
            groupId={data.group_id} fireId={params.fireId}/>
          <div className={styles.header}>
            <span>{ data.title }<hr /></span>
          </div>
          {Object.entries(data.content).map((obj, index) => (
            <RenderArticleContent obj={obj[1]} index={index} />
          ))}
          <ButtonsInArticle position={'down'}
            groupId={data.group_id} fireId={params.fireId}/>
        </>
      )}
    </div>
  )
}