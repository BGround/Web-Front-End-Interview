'use strict'

// import React from 'react';
// import ReactDOM from 'react-dom'
// import largeNumber from 'large-number-bground'
// import './search.css'
// import './search.less'
// import logo from './assets/logo.jpg'

const React = require('react');
const ReactDOM = require('react-dom');
const largeNumber = require('large-number-bground');
require('./search.css');
require('./search.less');
const logo = require('./assets/logo.jpg');

class Search extends React.Component {
	
	constructor(arg) {
	    super(arg)
		this.state = {
			Text: null
		};
	}
	
	loadComponent() {
		import('./text.js').then((Text) => {
			this.setState({
				/** 
				 * 因为commonsjs模块export default导出的名子是default，可以理解为Text.js导出了一个对象
				 * 这个对象里边包含Text 导出 的所有内容，普通的export 导出的就是你自己定义的对应名子，而export default 会使用 default 作为默认名字 
				 **/
				Text: Text.default
			})
		})
	}
	
	render() {
		const {Text} = this.state;
		const largeResult = largeNumber('999', '1');
		return <div className = 'search-text'>
		{
			Text ? <Text /> : null
		}
		{largeResult}
		Search Text content <img src = {logo} onClick = {this.loadComponent.bind(this)}/>
		</div>;
	}
}

module.exports = <Search />;