
import React from 'react';
import {render} from 'react-dom';
import Test from './components/test.js';

import './styles/main.css';//使用require导入css文件
render(<div id='root' >
	<Test/>
	</div>
	,document.getElementById('root'));
