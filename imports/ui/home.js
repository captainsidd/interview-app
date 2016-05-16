//import required meteor packages
import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import './home.html';

//enable Session variable pages to be used
Template.registerHelper('pages',function(input){
  return Session.get('pages');
});

//enable Session variable FBLoggedIn to be used
Template.registerHelper('FBLoggedIn',function(input){
  return Session.get('FBLoggedIn');
});

//define events
Template.home.events({
  //on clicking FBLogin, login
  'click #FBlogin': function(){
    facebookLogin();
  },
  //on clicking FBLogout, logout
  'click #FBlogout': function(){
    facebookLogout();
  },
});

//prompts user to log into facebook
function facebookLogin() {
  //API call to get user's login status
  FB.getLoginStatus(function(response) {
    //if user logged in to both this app and facebook (connected)
    if (response.status === 'connected') {
      //facebook's GRAPH API call to get all pages user can access
      FB.api('/me/accounts', function(response) {
        //set Session variable pages to array returned from API call
        setPages(response);
      });
    } else {
      // FB.login();
    }
  });
  //API call to login, prompts alert with facebook sign in
  FB.login(function(response) {
    //if login is or isn't successful, write to console
    if (response.authResponse) {
      console.log('You\'re logged in, my man.');
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
    //check login status again
    checkLoginStatus();
  }, {
    //scope -> permissions requested by application from user
    scope: 'manage_pages,publish_pages,publish_actions',
    return_scopes: true
  });
};

//checks login status of application
function checkLoginStatus() {
  //API call to get user's login status
  FB.getLoginStatus(function(response) {
    //if user logged in to both this app and facebook (connected)
    if (response.status === 'connected') {
      //set Session variable storing if user logged in or not to true
      setFBLoggedIn(true);
      //facebook's GRAPH API call to get all pages user can access
      FB.api('/me/accounts', function(response) {
        //set Session variable pages to array returned from API call
        setPages(response);
      });
    } else {
      //if not connected, user not logged in.
      setFBLoggedIn(false);
    }
  });
};

//logs out of facebook
function facebookLogout() {
  //API call to logout
  FB.logout(function(response) {
    setFBLoggedIn(false);
  });
};

//set Session variable pages to array returned from API call
function setPages(response) {
  Session.set('pages', response.data)
};

//sets Session variable to bool
//Used to makes sure user is logged into facebook
function setFBLoggedIn(bool) {
  Session.set('FBLoggedIn', bool)
};
