import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <div className='text-3xl font-bold text-center'>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </div>        
    </>
  )
}

export default App
