import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


import ShowBookList from './Views/ShowBookList';
import ShowBookDetails from './Views/ShowBookDetails';
import CreateBook from './Views/CreateBook';
import Home from './Views/Home'
import SignUp from './Views/SignUp'

function App() {
  return (
    <div className="App">



      <Router>
        <NavBar />
        <div>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<Home />} />
            <Route exact path='/' element={<ShowBookList />} />
            <Route path='/show-book/:id' element={<ShowBookDetails />} />
            <Route path='/create-book' element={<CreateBook />} />
          </Routes>
        </div>
      </Router>





    </div>
  );
}

export default App;
library.add(fab, fas, far)
