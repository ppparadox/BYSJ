
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'




class Busquery extends Component{

	constructor(props){
		super(props);
		this.state={
			routeid:'',
			data:[],
			updatedisabled:true
		}

		this.hand=this.hand.bind(this);
		this.update=this.update.bind(this);
		this.updatedetailname=this.updatedetailname.bind(this);
		this.updatedetailprice=this.updatedetailprice.bind(this);
		this.updatedetailstate=this.updatedetailstate.bind(this);
	}

	update(){
		let URL = 'http://127.0.0.1:8089/querydetail';
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
		.then(dataa => {
			var jsonobj=JSON.parse(dataa);
			var jsonArr = [];
			for(var i =0 ;i < jsonobj.length;i++){
				jsonArr[i] = jsonobj[i];
			}
			
			this.setState({data:jsonArr});
		});


	}


	updatedetailstate(){
		this.state.updatedisabled?this.setState({updatedisabled:false}):this.setState({updatedisabled:true});


	}


	updatedetailname(e){
		const name=e.target.value;
		const indexx=e.target.getAttribute("data-index");


		const URL1 = 'http://127.0.0.1:8089/updatedetailname';
		fetch(URL1, {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(
			{
				routeid:this.state.routeid,
				index:indexx,
				name:name
			}
			)
		}).then(response => response.text())
		.then(dataa => {	
			alert(dataa);
			this.update();
			

		});


	}

	updatedetailprice(e){

		const price=e.target.value;
		const indexx=e.target.getAttribute("data-index");
		const URL1 = 'http://127.0.0.1:8089/updatedetailprice';
		fetch(URL1, {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(
			{
				routeid:this.state.routeid,
				index:indexx,
				price:price
			}
			)
		}).then(response => response.text())
		.then(dataa => {	
			alert(dataa);
			this.update();
			

		});

	}


	hand(){
		this.setState({routeid:this.props.location.state.routeid},function(){this.update();});
		
	}
	
	componentDidMount(){
		this.hand();
		
	}


	render(){
		return(
			<div style={{position:'absolute',marginLeft:'15%',marginTop:'5%',width:'70%'}} onClick={this.hand}>
			<h1 style={{textAlign:'center'}}>公交详细站点明细</h1>
			<Link to='/'>
			<Button type="danger"   >返回登录</Button>
			</Link>
			<Button type="primary"  onClick={this.updatedetailstate}  style={{visibility:this.state.visibility,marginLeft:'60px'}} >修改</Button>
			
			<List
			size="small"
			header={<div style={{fontSize:'bolder'}}>路线--{this.state.routeid}号公交车--详细站点表</div>}
			bordered
			dataSource={this.state.data}
			renderItem={item => (<List.Item>
			
				<div style={{width:'35%'}}>★位置索引：</div>
				<Input  value={item.stopindex} disabled={true}  />
				：<div style={{width:'35%'}}>★站点名称</div>
				<Input defaultValue={item.placename} disabled={this.state.updatedisabled} onBlur={this.updatedetailname} data-index={item.stopindex} />
				<div style={{width:'35%'}} >★本站价格：</div>
				<Input defaultValue={item.price} disabled={this.state.updatedisabled}  onBlur={this.updatedetailprice} data-index={item.stopindex}/> 
				</List.Item>)
		}
		/>

		</div>

		);
	}



}



export default Busquery