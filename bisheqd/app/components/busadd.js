
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Menu extends Component{

constructor(props){
		super(props);
		this.state={
			routeid:'',
			stopnum:'',
			timecost:'',
			first_time:'',
			last_time:'',
			wfstate:''

			

		};



	}

render(){
		return(
			<div style={{position:'absolute',marginLeft:'40%',marginTop:'5%'}}>
			<form  action="http://127.0.0.1:8089" method="get">

			<h1>公交路线注册界面</h1>
			<p>公交路线号: <Input   onChange={e=>this.setState({routid:e.target.value})} /></p>
			<p>总站点数量: <Input   onChange={e=>this.setState({stopnum:e.target.value})} /></p>
			<p>总站点预计耗时: <Input   onChange={e=>this.setState({timecost:e.target.value})} /></p>
			<p>早班时间: <Input   onChange={e=>this.setState({first_time:e.target.value})} /></p>
			<p>晚班时间: <Input   onChange={e=>this.setState({last_time:e.target.value})} /></p>
			<p>往返状态: <Input   onChange={e=>this.setState({wfstate:e.target.value})} /></p>


			<Button type="primary"   style={{marginLeft:'10%',marginTop:'5%'}}>下一步详情站点输入</Button>

			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',margin:'10%'}}>注册地址</Button>
			</Link>
			</form>
			</div>

			);
	}



}



	export default Menu