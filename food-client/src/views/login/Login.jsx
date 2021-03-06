import React,{Component} from 'react';
import {FormGroup, FormControl,Button,ControlLabel} from 'react-bootstrap';
import '../../assets/css/login.css';
import axios from 'axios'
export default class Login extends Component {

    constructor (props){
        super(props);

        this.state={
            username:'',
            password:'',
        }
        this.loginFunc = this.loginFunc.bind(this)
    }

    loginFunc(){
      var self = this;

      axios.post('/login',{
        username:this.state.username,
        pass:this.state.password
      })
      .then((res)=>{
        sessionStorage.setItem("token",res.data.token)
        sessionStorage.setItem("username",this.state.username)
        window.location.reload();
      })
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    

    render(){

        return(
            <div id="fullscreen_bg" className="fullscreen_bg">
             <div className="form-signin">
            <div className="rowlg">
            <h1 className="topic">Food 4 U </h1>

                 
   
   <form onSubmit={this.handleSubmit} >
   <h1 className="signin">Sign In</h1>
 
    <div id="gocenter">
    <FormGroup controlId="username" bsSize="large" >
     
     <FormControl

       type="text"
       value={this.state.username}
       onChange={this.handleChange}
       placeholder="Username"
       
     />
   </FormGroup>


   <FormGroup controlId="password" bsSize="large" >
  
     <FormControl
       value={this.state.password}
       onChange={this.handleChange}
       type="password"
       placeholder="Password"
     />
   </FormGroup>

   <div id="logingButton">
   <FormGroup>
   {/* <Button bsStyle="warning" bsSize="large" block onClick={this.processLog}> */}
   <Button bsStyle="primary"  bsSize="large" onClick={this.loginFunc} >Login</Button>
 
</FormGroup> 
</div>
   

    </div>
   </form>

 
   </div>

                </div>  
                </div>
        )
    }
}

