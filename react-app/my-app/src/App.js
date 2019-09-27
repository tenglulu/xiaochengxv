import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,  
  Link,
  Switch,
  Redirect
 } from "react-router-dom";
 import Test1 from "./componet/Test1"
 import Test2 from "./componet/Test2"
 const Foo=({match})=>{
   return(
    <h1>hello{match.params.id}</h1>
   )
 }
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/66">test1</Link>|
        <Link to="/test2">test2</Link>|
        <Link to="/Foo/12345">foo</Link>|
        <Link to="/test2">redirect</Link>|
        <Switch>
        
        <Route path="/Foo/:id" component={Foo}></Route>
        
        <Route path="/test2" component={Test2}></Route>
        <Route path="/:id" component={Test1}></Route>
        <Route path="/redirect" render={()=>{
            return(
              <Redirect to="/test2"/>
            )
          }}/>

         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
