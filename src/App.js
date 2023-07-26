import React from 'react';
import './App.css';
import NavBars from './component/NavBars'
import Home from './component/Home/Home'
import Auth from './component/Auth/Auth'
import Question from './component/Question';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AskQuestion from './component/AskQuestion';
import DisplayQuestion from './component/DisplayQuestion';
import Tags from './component/Tags/Tags'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/Users';
import Users from './component/Users/Users';
import UserProfile from './component/UserProfile/UserProfile';
import ForgetPassword from './component/ForgetPassword';
import PasswordReset from './component/PasswordReset';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);
  

  return <>
  <BrowserRouter>
  <NavBars/>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/Auth' element={<Auth/>}/>
    <Route path='/Questions' element={<Question/>}/>
    <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
    <Route path='/AskQuestion' element = {<AskQuestion/>}/>
    <Route path='/Tags' element={<Tags/>}/>
    <Route path='Users' element={<Users/>}/>
    <Route path='Users/:id' element={<UserProfile/>}/>
    <Route path='password-reset' element={<PasswordReset/>}/>
    <Route path='forgetpassword/:id/:token' element={<ForgetPassword/>}/>
  </Routes>
  </BrowserRouter>  
  </>
}

export default App;
