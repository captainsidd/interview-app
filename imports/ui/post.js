import { Template } from 'meteor/templating';

import './post.html';


Template.post.events({
  'submit #new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var target = event.target;
    var text = target.text.value;
    postToPage(text);
  },
});


function postToPage(body) {
  FB.api('/'+ Router.current().params.page_id + '/feed', 'post', { message: body }, function(response) {
    if (!response || response.error) {
      console.log(response.error);
      alert('Error occured');
    } else {
      console.log(response);
      if(response.id){
        alert('Your post has been made! Go check it out.');
        Router.go('/home');
      }
    }
  });
};
