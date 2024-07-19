import Home from './pages/Home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup'
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage/>} />
          <Route path='/dashboard' exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Signup/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
