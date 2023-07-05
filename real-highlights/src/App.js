import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


import ShowBookList from './Pages/ShowBookList';
import ShowBookDetails from './Pages/ShowBookDetails';
import CreateBook from './Pages/CreateBook';
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'


function App() {
  const user = true
  return (
    <div className="App">



      <Router>
        <NavBar user={user}/>
        <div>
          <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={user ? <Navigate to='/'/> : < Home/>} />
            <Route exact path='/' element={user ? <ShowBookList /> : < Home/>} />
            <Route path='/show-book/:id' element={user ? <ShowBookDetails /> : <Home />} />
            <Route path='/create-book' element={user ? <CreateBook /> : <Home />} />
          </Routes>
        </div>
      </Router>





    </div>
  );
}

export default App;
library.add(fab, fas, far)
