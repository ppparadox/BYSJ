
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'




class Menu extends Component{

	constructor(props){
		super(props);
		this.state={
			data:[],
			visibility:'visiable'
		};

		this.delete=this.delete.bind(this);
		this.update=this.update.bind(this);
		this.querydetail=this.querydetail.bind(this);

	}

	delete(e){
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


	querydetail(e){
		const routeid=e.target.getAttribute("data-dd")
		this.props.history.push({pathname:'./busquery',state:{routeid:routeid}});

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

	componentDidMount(){

		if(this.props.location.state.isadmin!=='超管')
			this.setState({visibility:'hidden'});
		this.update();
	}



	render(){
		return(
			<div style={{position:'absolute',marginLeft:'30%',marginTop:'5%',width:'40%'}}>
			<form  action="http://127.0.0.1:8089" method="get">
			<h1 style={{textAlign:'center'}}>公交路线管理系统后台菜单</h1>


			<Button type="primary"  style={{marginLeft:'0%',marginTop:'5%',visibility:this.state.visibility}} >
			<Link to='/busadd'>公交路线添加</Link></Button>
			

			
			<Button type="danger"  style={{marginLeft:'70%',marginTop:'5%',visibility:this.state.visibility}} ><Link to='/'>返回登录	</Link></Button>
		

			</form>

			<List
			size="small"
			header={<div>目前已经存在的公交车路线</div>}
			style={{marginTop:'10px'}}
			bordered
			dataSource={this.state.data}
			renderItem={item => (<List.Item>
				<Button type="danger"  onClick={this.delete} data-dd={item.routeid} style={{visibility:this.state.visibility}} >删除</Button>

				<Button type="primary"  onClick={this.querydetail} data-dd={item.routeid}  >明细</Button>

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



export default Menu