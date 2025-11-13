import $ from 'jquery'
import Post from '@model/post';
import '@css/style.css'
import data from '@assets/data.json';
import logo from '@assets/logo-js-svgrepo-com.png';
import xml from '@assets/data.xml';
import './less/style.less';
import './sass/style.scss'
import './sass/style.sass'

const post = new Post('Webpack Post Title', logo);

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log('IS DEV:', isDev)
console.log('IS PROD:', isProd)

$('pre').addClass('code').html(post.toString())

console.log('JSON Data:', data);

console.log('XML:', xml)