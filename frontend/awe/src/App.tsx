import './App.scss';
import Nav from './components/nav/Nav';
import User from './components/user/User';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <User />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
