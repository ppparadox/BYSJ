// main.js
import React,{Component} from 'react'
import {render} from 'react-dom';
import fetch from 'isomorphic-fetch'
import { Button } from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import Loginform from './loginform.js'
import Registerform from './registerform.js'
import Menu from './menu.js'
import Busadd from './busadd.js'
import Detail from './detail.js'
import Busquery from './busquery.js'


class Test extends Component{
	constructor(props){
		super(props);
		this.state={
			name:1333,};

	}


	render(){
		return(
			<div style={{position:'absolute',Left:'0',Right:'0',margin:'auto',width:'100%',height:'100%'}}>
			<HashRouter history={hashHistory}>
			<div>
			<Route  exact path="/" component={Loginform} />
			<Route  path="/register" component={Registerform} />
			<Route  path="/menu" component={Menu} />
			<Route  path="/busadd" component={Busadd} />
			<Route  path="/detail" component={Detail} />
			<Route  path="/busquery" component={Busquery} />
			</div>
			</HashRouter>
			</div>

			);
	}


}

	export default Test