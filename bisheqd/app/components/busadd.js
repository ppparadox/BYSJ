
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Busadd extends Component{

	constructor(props){
		super(props);
		this.state={
			routeid:'',
			stopnum:'',
			timecost:'',
			first_time:'',
			last_time:'',
			wfstate:'',
			data:[]

		};

		this.addbus=this.addbus.bind(this);
		this.update=this.update.bind(this);
		this.aaa=this.aaa.bind(this);

	}

	aaa(e){
		const routeid1=e.target.getAttribute("data-dd");


		const URL1 = 'http://127.0.0.1:8089/delete';
		fetch(URL1, {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(
				{routeid:routeid1}
				)
		}).then(response => response.text())
		.then(dataa => {	
			alert(dataa);
			this.update();


		});



	}


	update(){
		let URL = 'http://127.0.0.1:8089/queryall';
		fetch(URL, {
			method: 'get',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		}).then(response => response.json())
		.then(dataa => {
			var jsonobj=JSON.parse(dataa);
			var jsonArr = [];
			for(var i =0 ;i < jsonobj.length;i++){
				jsonArr[i] = jsonobj[i];
			}
			this.setState({data:jsonArr});
		});


	}




	addbus(){
		let URL = 'http://127.0.0.1:8089/busregister';
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
		.then(data =>{alert(data)

			this.props.history.push({pathname:'./detail',state:{routeid:this.state.routeid,stopnum:this.state.stopnum}});


		}
		);

	}


	componentDidMount(){
		this.update();
	}






	render(){
		return(
			<div style={{position:'absolute',marginLeft:'28%',marginTop:'5%',width:'40%'}}>
			<form  action="http://127.0.0.1:8089" method="get">
			<h1>公交路线注册界面</h1>
			<p>公交路线号: <Input   onChange={e=>this.setState({routeid:e.target.value})}  /></p>
			<p>总站点数量: <Input   onChange={e=>this.setState({stopnum:e.target.value})} /></p>
			<p>总站点预计耗时: <Input   onChange={e=>this.setState({timecost:e.target.value})} /></p>
			<p>早班时间: <Input   onChange={e=>this.setState({first_time:e.target.value})} /></p>
			<p>晚班时间: <Input   onChange={e=>this.setState({last_time:e.target.value})} /></p>
			<p>往返状态: <Input   onChange={e=>this.setState({wfstate:e.target.value})} /></p>
			<Button type="primary"  onClick={this.addbus} style={{marginLeft:'10%',margin:'1%'}}>下一步详情站点输入</Button>

			<Link to='/'>
			<Button type="danger"  style={{marginLeft:'50%',margin:'5%'}} >返回登录</Button>
			</Link>
			</form>
			<List
			size="small"
			header={<div>目前已经存在的公交车路线</div>}
			
			bordered
			dataSource={this.state.data}
			renderItem={item => (<List.Item>
				★★★公交路线号：
				<h3>{item.routeid}</h3> 
				★★★总站点数：
				<h3>{item.stopnum}</h3>
				★★★首班车时间：
				<h3>{item.first_time} </h3>
				★★★末班车时间：
				<h3>{item.last_time}</h3>
				</List.Item>)}
			/>
			</div>

			);
	}



}



export default Busadd