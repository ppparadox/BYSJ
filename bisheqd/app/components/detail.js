
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Detail extends Component{

	constructor(props){
		super(props);
		this.state={
			routeid:'6383',
			index:'1',
			placename:'3',
			price:'3'
	
		};

		this.continue=this.continue.bind(this);
		this.complete=this.complete.bind(this);

	}



	continue(){
		var dindex=this.state.index;
		let URL = 'http://127.0.0.1:8089/adddetail';
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
		.then(data => {
			dindex++;
			this.setState({index:dindex});



			alert(data)}
			);

	}


	complete(){
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
		.then(data => alert(data
			));

	}




	componentDidMount(){
	
		
			this.setState({routeid:this.props.location.state.routeid});
}



	render(){
		return(
			<div style={{position:'absolute',marginLeft:'40%',marginTop:'5%'}}>
			<form  action="http://127.0.0.1:8089" method="get">
			<h1>公交详情站点添加</h1>
			<p>路线编号: <Input  disabled="true"  onChange={e=>this.setState({routeid:e.target.value})} value={this.state.routeid} /></p>
			<p>站点位置: <Input   disabled="true" onChange={e=>this.setState({index:e.target.value})} value={this.state.index} /></p>
			<p>站点名称: <Input   onChange={e=>this.setState({placename:e.target.value})}  /></p>
			<p>本站价格: <Input   onChange={e=>this.setState({price:e.target.value})} /></p>
			<Button type="primary"  onClick={this.continue} style={{marginLeft:'10%',marginTop:'5%'}}>继续输入</Button>
			<Button type="primary"  onClick={this.complete} style={{marginLeft:'10%',marginTop:'5%'}}>完成</Button>
			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',margin:'10%'}}>返回注册地址</Button>
			</Link>
			</form>
			</div>

			);
	}



}



export default Detail