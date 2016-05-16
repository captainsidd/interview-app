//import required meteor packages
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import all files needed from imports/
import './main.html';
import '../imports/ui/login.js';
import '../imports/ui/home.js';
import '../imports/ui/post.js';
import '../imports/ui/header.js';
import '../imports/startup/accounts-config.js';
import '../imports/startup/facebook-sdk.js';


//Routes----------------------------------------------------------------------
Router.route('/', function () {
  this.render('login');
});

Router.route('/home', function () {
  this.render('home');
});

Router.route('/login', function () {
  this.render('login');
});

//send page_id (route params) to user as page_id
Router.route('/post/:page_id', function () {
  this.render('post', {
    data: function () {
      return {page_id: this.params.page_id};
    }
  });
});
