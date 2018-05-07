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


class Test extends Component{
	constructor(props){
		super(props);
		this.state={
			name:1333,};

	}


	render(){
		return(
			<div>
		
			<HashRouter history={hashHistory}>
			<div>
			<Route  exact path="/" component={Loginform} />
			<Route  path="/register" component={Registerform} />
			<Route  path="/menu" component={Menu} />
			<Route  path="/busadd" component={Busadd} />
			</div>
			</HashRouter>
			</div>

			);
	}


}

	export default Test