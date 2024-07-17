import Home from './pages/Home/Home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/Signup'
import Navbar from './components/NavBar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/dashboard' exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Signup/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
