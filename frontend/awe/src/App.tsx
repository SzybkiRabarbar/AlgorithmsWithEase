import './App.scss';

import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import Groups from './pages/groups/Groups';
import Progres from './pages/progres/Progress';
import GroupsDataInterface from './interfaces/GroupsDataInterface';
import FetchDataFromServer from './utils/FetchDataFromServer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [groupsData, setGroupsData] = useState<GroupsDataInterface | null>(null);

  useEffect(() => {
    FetchDataFromServer('/api/groups/', setGroupsData);
  }, []);

  if(groupsData === null) {
    return (
      <></>
    );
  } else {
    return (
      <Router>
        <div className="App">
          <Nav />
          <div className="container">
            <div className="content">
              <Routes>
                <Route path="/groups" element={<Groups groupsData={groupsData}/>} />
                <Route path="/progress" element={<Progres />} />
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
