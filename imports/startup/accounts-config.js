import { Accounts } from 'meteor/accounts-base';
//set up built in account package to be username only
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
