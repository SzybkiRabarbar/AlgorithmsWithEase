import './Nav.scss';
import burger from '../../assets/bars-solid-400.svg';

function Nav() {
  return (
    <div className="Nav">
      <img src={burger} alt='≡' width="40" height="40"></img>
    </div>
  );
}

export default Nav;