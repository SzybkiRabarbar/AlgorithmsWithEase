import { useParams } from 'react-router-dom'
import './Article.scss'
import FetchDataFromServer from '../../utils/FetchDataFromServer';
import ArticleContentInterface from '../../interfaces/ArticleContentInterface';
import GenereteArticleDiv from '../../components/generating_articles/GenerateArticleDiv';
import Loading from '../../components/loading/Loading';
import ButtonsInArticle from '../../components/buttons_in_article/ButtonsInArticle';

function Article() {
  const { fire_id } = useParams();

  const { data, error, isLoading } = 
    FetchDataFromServer<ArticleContentInterface>('/api/content/article/' + fire_id);
    
  return (
    <div className='Article'>
      {isLoading &&
        <Loading />
      }
      {data && fire_id && (
        <>
          <ButtonsInArticle position={'up'}
            group_id={data.group_id} fire_id={fire_id}/>
          <div className='header'>
            <span>{ data.title }<hr /></span>
          </div>
          {Object.entries(data.content).map((obj, index) => (
            <GenereteArticleDiv obj={obj[1]} index={index} />
          ))}
          <ButtonsInArticle position={'down'}
            group_id={data.group_id} fire_id={fire_id}/>
        </>
      )}
    </div>
  )
}

export default Article