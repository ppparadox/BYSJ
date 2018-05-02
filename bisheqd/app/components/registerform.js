// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'



class Registerform extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'33',
			password:'444',
			name:'',
			sex:'',
			isadmin:''

		};

	this.register = this.register.bind(this);


	}



	register(){
 let URL = 'http://127.0.0.1:8089/register';
fetch(URL, {
  method: 'post',
  mode: 'cors',
   headers: {
    'Content-Type': 'application/json;charset=utf-8'
            },
  body: JSON.stringify(
			this.state
		)

}).then(response => response.json())
  .then(data => alert(
  	"登录名为："+data.username+
  	"密码为："+data.password+
  	"姓名为："+data.name+
  	"性别为："+data.sex+
  	"权限为："+data.isadmin

  	));

}

	componentDidMount(){
	

	
}


	




	render(){
		return(
		<div style={{position:'absolute',marginLeft:'40%',marginTop:'5%'}}>
	   <form  action="http://127.0.0.1:8089" method="get">

	   <h1>React SPA 注册界面</h1>
 <p>姓名: <Input   onChange={e=>this.setState({name:e.target.value})} /></p>
  <p>性别: <Input   onChange={e=>this.setState({sex:e.target.value})} /></p>
   <p>权限: <Input   onChange={e=>this.setState({isadmin:e.target.value})} /></p>
  <p>帐号: <Input   onChange={e=>this.setState({username:e.target.value})} /></p>
  <p>密码: <Input   onChange={e=>this.setState({password:e.target.value})} /></p>


   <Button type="primary"   onClick={this.register} style={{marginLeft:'10%',marginTop:'5%'}}>登录</Button>

	<Link to='/'>
		<Button  style={{positionLeft:'absolute',margin:'10%'}}>返回登录</Button>
		</Link>
	</form>
	</div>

			);
	}


}

	export default Registerform