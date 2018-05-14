// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'



class Loginform extends Component{
	constructor(props){
		super(props);
		this.state={
			account:'',
			password:''

		};

		this.login = this.login.bind(this);


	}



	login(){
		if(this.state.account==''||this.state.password=='')
			alert('请输入帐号密码');
		else 

		{
			let URL = 'http://127.0.0.1:8089/login';
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
			.then(
				data => {
					if(data=='无该注册帐号')
						alert(data);
						else 
							{alert('欢迎您，'+data);
							this.props.history.push({pathname:'./menu',state:{isadmin:data}});

		
							}

				}
				);

		}

	}




	componentDidMount(){



	}

	render(){
		return(
			<div style={{position:'absolute',left:'0',right:'0',margin:'auto',width:'600px',marginTop:'50px'}}>
			<form  action="http://172.20.10.10:8089" method="get">

			<h1 style={{textAlign:'center-'}}>公交路线管理系统登录界面</h1>

			<p>请输入您的帐号: <Input   onChange={e=>this.setState({account:e.target.value})} /></p>
			<p>请输入您的密码: <Input   onChange={e=>this.setState({password:e.target.value})} /></p>


			<Button type="primary"   onClick={this.login} style={{marginLeft:'10%',marginTop:'5%'}}>登录</Button>

			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',margin:'10%'}}>注册地址</Button>
			</Link>
			</form>
			</div>

			);
	}


}

export default Loginform