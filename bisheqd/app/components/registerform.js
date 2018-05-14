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
			account:'',
			password:'',
			name:'',
			sex:'男',
			isadmin:'管理员'

		};

		this.register = this.register.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.handleChangex=this.handleChangex.bind(this);



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

		}).then(response => response.text())
		.then(data => alert(data
			));

	}

	handleChange(event) {		
		　this.setState({sex: event.target.value});

	}

	handleChangex(event) {		
		　 
		this.setState({isadmin: event.target.value});

	}

	componentDidMount(){

		
	}




	render(){

		return(
			<div style={{position:'absolute',marginLeft:'35%',marginTop:'5%',width:'35%',height:'40px;'}}>
			

			<h1>React SPA 注册界面</h1>
			<p>姓名: <Input   onChange={e=>this.setState({name:e.target.value})} /></p>
			<p>性别: <br/>
			<select value={this.state.sex} onChange={this.handleChange} style={{width:'100%',marginBottm:'10px'}}>
			　　　　　　　　　　<option value='男'>男</option>
			　　　　　　　　　　<option value='女'>女</option>
			　　　　　　
			　　　　　　　　</select>

			</p>
			<p>权限: <br/>
			<select value={this.state.isadmin} onChange={this.handleChangex} style={{width:'100%',marginBottm:'10px'}}>
			　　　　　　　　　　<option value='管理员'>管理员</option>
			　　　　　　　　　　<option value='普通用户'>普通用户</option>
			　
			　　　　　　　　</select>

			</p>
			<p>帐号: <Input   onChange={e=>this.setState({account:e.target.value})} /></p>
			<p>密码: <Input   onChange={e=>this.setState({password:e.target.value})} /></p>


			<Button type="primary"   onClick={this.register} style={{marginLeft:'10%',marginTop:'5%'}}>注册</Button>

			<Link to='/'>
			<Button  style={{positionLeft:'absolute',margin:'10%'}}>返回登录</Button>
			</Link>

			</div>

			);
	}


}

export default Registerform