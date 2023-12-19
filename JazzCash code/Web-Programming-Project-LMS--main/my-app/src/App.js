import logo from './logo.svg';
import {BrowserRouter, Router, Routes,Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import './App.css';

function App() {
  return (
  //  <Login></Login>
  <BrowserRouter>
    <Routes>
      <Route path='/Login' element={<Login></Login>}></Route>
      <Route path='/Signup' element={<Signup></Signup>}></Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App;
