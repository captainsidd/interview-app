import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

import './home.html';

//check if logged into facebook
//get api/me/accounts
//display all pages
//on click of page row, go to /post/{page_id}

Template.registerHelper('pages',function(input){
  return Session.get('pages');
});

Template.registerHelper('FBLoggedIn',function(input){
  return Session.get('FBLoggedIn');
});

Template.home.events({
  'click #FBlogin': function(){
    facebookLogin();
  },
  'click #FBlogout': function(){
    facebookLogout();
  },
});

function facebookLogin() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.api('/me/accounts', function(response) {
        setPages(response);
      });
    } else {
      // FB.login();
    }
  });
  FB.login(function(response) {
      if (response.authResponse) {
        console.log('You\'re logged in, my man.');
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
      checkLoginStatus();
  }, {
    scope: 'manage_pages,publish_pages,publish_actions',
    return_scopes: true
  });
};

function checkLoginStatus() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      setFBLoggedIn(true);
      FB.api('/me/accounts', function(response) {
        setPages(response);
      });
    } else {
      setFBLoggedIn(false);
    }
  });
}

function facebookLogout() {
  FB.logout(function(response) {
    setFBLoggedIn(false);
  });
}

function setPages(response) {
  Session.set('pages', response.data)
};

function setFBLoggedIn(bool) {
  Session.set('FBLoggedIn', bool)
};
