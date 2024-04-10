'use client'

import styles from './Article.module.scss'
import ArticleContentInterface from '@/utils/interfaces/ArticleContentInterface';
import Loading from '@/components/loading/Loading';
import ButtonsInArticle from '@/components/article-functional-buttons/ArticleFunctionalButtons';
import RenderArticleContent from '@/components/render-article-content/RenderArticleContent';
import fetchDataFromServer from '@/utils/fetchDataFromServer';


export default function Article(params: {fireId: string}) {

  const { 
      data: articleData,
      error: articleError,
      isLoading: articleIsLoading 
  } = 
    fetchDataFromServer<ArticleContentInterface>(
      '/api/content/article/' + params.fireId
    );

  return (
    <div className={styles.Article}>
      {articleIsLoading &&
        <Loading />
      }
      {articleData && (
        <>
          <ButtonsInArticle position={'up'}
            groupId={articleData.group_id} fireId={params.fireId}/>
          <div className={styles.header}>
            <span>{ articleData.title }<hr /></span>
          </div>
          {Object.entries(articleData.content).map((obj, index) => (
            <RenderArticleContent obj={obj[1]} index={index} />
          ))}
          <ButtonsInArticle position={'down'}
            groupId={articleData.group_id} fireId={params.fireId}/>
        </>
      )}
    </div>
  )
}