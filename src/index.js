import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import App from './App'
import './assets/less/index.less'

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </LocaleProvider>,
    document.getElementById('root')
)