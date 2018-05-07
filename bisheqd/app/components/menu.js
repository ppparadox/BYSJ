
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Menu extends Component{


render(){
		return(
			<div style={{position:'absolute',marginLeft:'40%',marginTop:'5%'}}>
			<form  action="http://127.0.0.1:8089" method="get">



			<Link to='/busadd'>
			<Button type="primary"  style={{marginLeft:'0%',marginTop:'5%'}}>公交路线添加</Button>
			</Link>
			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',margin:'10%'}}>注册地址</Button>
			</Link>
			</form>
			</div>

			);
	}



}



	export default Menu