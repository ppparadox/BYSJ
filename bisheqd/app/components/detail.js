
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Detail extends Component{

	constructor(props){
		super(props);
		this.state={
			routeid:'6383',
			index:'1',
			placename:'',
			price:'',
			data:[],
			updatedisabled:true


		};

		this.continue=this.continue.bind(this);
		this.complete=this.complete.bind(this);
		this.update=this.update.bind(this);
		this.deletedetail=this.deletedetail.bind(this);
		
	

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
			if(dindex<=this.props.location.state.stopnum)
			{
				dindex++;
				this.setState({index:dindex,});
				this.update();

			}
			else alert('已达到最大站点数量');

		}
		);

	}


	complete(){
		if(this.state.index<=this.props.location.state.stopnum)
		{
			alert('站点还未添加完全！')

		}
		else{
			alert('恭喜你，管理员！你已成功完成添加该公交车路线');
			this.props.history.push({pathname:'./menu',state:{isadmin:'超管'}});
		}

	}


	deletedetail(e){
		const indexx=e.target.getAttribute("data-dd");


		const URL1 = 'http://127.0.0.1:8089/deletedetail';
		fetch(URL1, {
			method: 'post',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(
				{routeid:this.state.routeid,
					index:indexx
				}
				)
		}).then(response => response.text())
		.then(dataa => {	
			alert(dataa);
			this.update();
			this.setState({index:this.state.index-1})


		});


	}

	


	


	componentDidMount(){
		this.setState({routeid:this.props.location.state.routeid});
	}



	render(){
		return(
			<div style={{position:'absolute',marginLeft:'15%',marginTop:'5%',width:'70%'}}>
			<form  action="http://127.0.0.1:8089" method="get">
			<h1 style={{textAlign:'center'}}>公交详情站点添加模块</h1>
			<p>路线编号: <Input  disabled="true"  onChange={e=>this.setState({routeid:e.target.value})} value={this.state.routeid} /></p>
			<p>站点位置: <Input   disabled="true" onChange={e=>this.setState({index:e.target.value})} value={this.state.index} /></p>
			<p>站点名称: <Input   onChange={e=>this.setState({placename:e.target.value})}  /></p>
			<p>本站价格: <Input   onChange={e=>this.setState({price:e.target.value})} /></p>
			<Button type="primary"  onClick={this.continue} style={{marginLeft:'10%',marginTop:'5%'}}>继续输入</Button>
			<Button type="primary"  onClick={this.complete} style={{marginLeft:'10%',marginTop:'5%'}}>完成</Button>
			<Link to='/'>
			<Button type="danger"  style={{marginLeft:'10%',marginTop:'5%',visibility:this.state.visibility}} >返回登录</Button>
			</Link>
		
			</form>
			<List
			size="small"
			header={<div>详细站点表</div>}
			bordered
			dataSource={this.state.data}
			renderItem={item => (<List.Item>
				<Button type="danger"  onClick={this.deletedetail} data-dd={item.stopindex} style={{visibility:this.state.visibility,marginLeft:'20px'}} >删除</Button>
				<div style={{width:'35%'}}>★位置索引：</div>
				<Input  value={item.stopindex} disabled={true}  />
				：<div style={{width:'35%'}}>★站点名称</div>
				<Input value={item.placename} disabled={this.state.updatedisabled}   />
				<div style={{width:'35%'}} >★本站价格：</div>
				<Input value={item.price} disabled={this.state.updatedisabled}  /> 
				</List.Item>)
		}
		/>
		</div>

		);
	}



}



export default Detail