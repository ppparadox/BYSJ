// main.js
import React,{Component} from 'react'
import {render} from 'react-dom';
import fetch from 'isomorphic-fetch'
 
class Test extends Component{
	constructor(props){
		super(props);
		this.state={
			name:1333,};

	}

	componentDidMount(){
	
let URL = 'http://127.0.0.1:8089';
fetch(URL, {
  method: 'get',
  mode: 'cors'
}).then(response => response.text())
  .then(dataaaa => alert(dataaaa));
  fetch(URL, {
  method: 'get',
  mode: 'cors'
}).then(response => response.text())
  .then(dataaaa => alert(dataaaa));



}




	render(){
		return(
			<div>
			1123123123
			</div>

			);
	}


}

	export default Test