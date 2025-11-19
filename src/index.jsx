import '@babel/polyfill';
import $ from 'jquery'
import Post from '@model/post';
import '@css/style.css'
import data from '@assets/data.json';
import logo from '@assets/logo-js-svgrepo-com.png';
import xml from '@assets/data.xml';
import './less/style.less';
import './sass/style.scss'
import './sass/style.sass'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import '@model/lodash'

const post = new Post('Webpack Post Title', logo);

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const App = () => (
  <div className="container">
  <h1>Webpack training</h1>
  <div className="webpack-logo" />
  <pre />
  <div className="less-demo">
  <h2>Less</h2>
  </div>
  <div className="scss-demo">
  <h2>Scss</h2>
  </div>
  <div className="sass-demo">
  <h2>Sass</h2>
  </div>
  </div>
  )

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

console.log('IS DEV:', isDev)
console.log('IS PROD:', isProd)

$('pre').addClass('code').html(post.toString())

console.log('JSON Data:', data);

console.log('XML:', xml)

async function start() {
  return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}

start().then((res) => console.log(res))

class Util {
  static id = Date.now();
}
console.log('Util Id:', Util.id);