import './GroupDetail.scss'

import { Link, useParams } from 'react-router-dom'
import FetchDataFromServer from '../../utils/FetchDataFromServer';
import ArticleDetailInterface from '../../interfaces/ArticleDetailInterface';
import Loading from '../../components/loading/Loading';

function GroupDetail() {
  const { id } = useParams();

  const { data, error, isLoading } = 
    FetchDataFromServer<ArticleDetailInterface[]>('/api/articles/group/' + id);

  return (
    <div className='GroupDetail'>
      {isLoading &&
        <Loading />
      }
      {data &&
        data.map((obj, index) => (
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