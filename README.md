# Full-Stack-Rolodex
Simple Rolodex app built in a few hours with .Net back end and Vue.js front end

## Setting up the backend
1) From the root directory, navigate to AspNetCore `cd AspNetCore` 
2) Run migrations `dotnet ef database update`
2) Start the dotnet server `dotnet run`

## Setting up the frontend
1) From the root directory, navigate to Rolodex `cd Rolodex`
2) Install node packages `npm install`
3) Once everything is installed, start the local server `npm run serve`

## Accessing the app
1) In a browser, navigate to http://localhost:8080


## What I would have done with more time
1) Utilized Vuex to keep track of state.  I originally had it set up, but as I was setting up authentication, it got phased out and was not re-implemented.
2) Had working users that could register/login/logout, instead of the "Admin view" where you can add/remove users and view their contacts.  I would have implemented this, but this was my first time seeing, much less building out a .Net back end.  After realizing that Okta wasn't the correct solution, I didn't have a lot of time remaining to implement IdentityUsers, which was my next plan.
3) Added layout containers to make the front-end look better.
4) Added a seed to the database to pre-populate it with sample data.
