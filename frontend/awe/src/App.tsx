import './App.scss';

import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import Groups from './pages/groups/Groups';
import Progres from './pages/progres/Progress';
import GroupDetail from './pages/group_detail/GroupDetail';
import GroupsDataInterface from './interfaces/GroupsDataInterface';
import FetchDataFromServer from './utils/FetchDataFromServer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Article from './pages/article/Article';

function App() {
  const [groupsData, setGroupsData] = 
    useState<GroupsDataInterface | null>(null);

  useEffect(() => {
    FetchDataFromServer('/api/groups/', setGroupsData);
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container">
          {groupsData === null && <div className="content">
            <div>Loading...</div>  {/* TODO better loading */}
          </div>}
          {groupsData && <div className="content">
            <Routes>
              <Route path="/article/:fire_id" 
                element={<Article />}
              />
              <Route path="/group/:id" 
                element={<GroupDetail />}
              />
              <Route path="/groups"
                element={<Groups groupsData={groupsData}/>}
              />
              <Route path="/progress"
                element={<Progres />}
              />
              <Route path="/test"
                element={<Test />}
              />
              <Route path="/"
                element={<Home />}
              />
            </Routes>
          </div>}
        </div>
      </div>
    </Router>
  );
}

export default App;
