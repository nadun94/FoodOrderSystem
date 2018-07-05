import React, { Component } from 'react';
// import { FormGroup, FormControl, Button } from 'react-bootstrap';
import logo from '../logo.png';
import '../App.css'
import FoodList from './FoodList/foods'
export default class Home extends Component {

    constructor (props){
        super(props);

      this.Logout = this.Logout.bind(this)
    }
    Logout(){
        sessionStorage.clear()
        window.location.reload();
    }

    render() {
        return (
            <div id="gocen">
                <header className="App1-header">
                    <img src={logo} className="App1-logo" alt="logo" />
                    <h1 className="App1-title">Online Food Caffe</h1>
                    <h4>Hi {sessionStorage.getItem("username")}</h4>
                    <h4 className="logout" onClick={this.Logout}> Logout </h4>
                </header>
        
                
                <p className="App1-intro">
                    Order Your Food List Now 😊
   </p>
<FoodList />

            </div>
    
        )
    }

}