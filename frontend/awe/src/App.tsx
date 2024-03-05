import './App.scss';
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import Progres from './pages/progres/Progress';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container">
          <div className="content">
            <Routes>
              <Route path="/progress" element={<Progres />} />
              <Route path='/test' element={<Test />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
