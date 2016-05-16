//import required meteor packages
import { Template } from 'meteor/templating';

import './header.html';

//define events
Template.header.events({
  //on clicking logout, prevent default action and
  //logout from Meteor's accounts-ui package
  'click #logout': function(event){
      event.preventDefault();
      Meteor.logout();
  }
});
