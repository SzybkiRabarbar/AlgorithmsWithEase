import './App.scss';

import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Test from './pages/test/Test';
import Groups from './pages/groups/Groups';
import GroupDetail from './pages/group_detail/GroupDetail';
import Article from './pages/article/Article';
import Info from './pages/info/Info';
import Map from './pages/map/Map';

import GroupsDataInterface from './interfaces/GroupsDataInterface';
import FetchDataFromServer from './utils/FetchDataFromServer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from './components/loading/Loading';

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
            <Loading />
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
              <Route path="/map"
                element={<Map />}
              />
              <Route path="/info"
                element={<Info />}
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
