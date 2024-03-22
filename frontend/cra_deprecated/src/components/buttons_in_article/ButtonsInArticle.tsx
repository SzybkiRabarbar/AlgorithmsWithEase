import AngleLeft from '../../assets/7e7e7e/angle-left-solid.svg'
import Square from '../../assets/7e7e7e/square-regular.svg'
import BookMark from '../../assets/7e7e7e/bookmark-regular.svg'
import { Link } from 'react-router-dom'
import './ButtonsInArticle.scss'

function ButtonsInArticle(props: {position: string, group_id: number, fire_id: string}) {
  return (
    <div className='ButtonsInArticle'>
      <div className={'buttons-cont ' + props.position}>
        <div className='button'>
          <Link 
              to={'/group/' + props.group_id}
              target={'_self'}
          >
            <img src={AngleLeft} alt={ "Angle" }></img>
          </Link>
        </div>
        <div className='button'>
          <img src={Square} alt={ "Square" }></img>
        </div>
        <div className='button'>
          <img src={BookMark} alt={ "Bookmark" }></img>
        </div>
      </div>
    </div>
  )
}

export default ButtonsInArticle