import $ from 'jquery'
import Post from '@model/post';
import '@css/style.css'
import data from '@assets/data.json';
import logo from '@assets/logo-js-svgrepo-com.png';
import xml from '@assets/data.xml';

const post = new Post('Webpack Post Title', logo);

$('pre').html(post.toString())

console.log('JSON Data:', data);

console.log('XML:', xml)