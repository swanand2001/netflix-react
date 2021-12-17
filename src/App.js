import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom';
import { auth } from './firebase';
import ProfileScreen from './screens/ProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      if (userAuth){
        //Logged In
        console.log(userAuth);
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email
        }))
      } else{
        //Logged Out
        dispatch(logout())
      }
    });

    return unsubscribe;
  },[dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ):(
        <Switch>
          <Route exact path='/'>
        <HomeScreen />
        </Route>
          <Route exact path='/profile'>
            <ProfileScreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
