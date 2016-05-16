//import required meteor packages
import { Template } from 'meteor/templating';

import './post.html';

//enable Session variable FBLoggedIn to be used
Template.registerHelper('FBLoggedIn',function(input){
  return Session.get('FBLoggedIn');
});

//define events
Template.post.events({
  //on submision of a new post
  'submit #new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    var target = event.target;
    var text = target.text.value;
    //call postToPage function with text
    postToPage(text);
  },
});

//checks login status of application
function checkLoginStatus() {
  //API call to get user's login status
  FB.getLoginStatus(function(response) {
    //if user logged in to both this app and facebook (connected)
    if (response.status === 'connected') {
      //set Session variable storing if user logged in or not to true
      setFBLoggedIn(true);
    } else {
      //set Session variable storing if user logged in or not to false
      setFBLoggedIn(false);
      //go to home page
      Router.go('/home');
    }
  });
};

//posts given message to the facebook page
function postToPage(body) {
  //posts given message using facebooks's GRAPH API to current page
  FB.api('/'+ Router.current().params.page_id + '/feed', 'post', { message: body }, function(response) {
    //if error or no response
    if (!response || response.error) {
      //log error and display alert
      console.log(response.error);
      alert('Error occured');
    } else {
      //log success message and display alert.
      console.log(response);
      if(response.id){
        alert('Your post has been made! Go check it out.');
        //go to home page
        Router.go('/home');
      }
    }
  });
};

//sets Session variable to bool
//Used to makes sure user is logged into facebook
function setFBLoggedIn(bool) {
  Session.set('FBLoggedIn', bool)
};
