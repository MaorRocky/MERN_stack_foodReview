Maor Rocky

how to run:
open terminal in the main folder
“$ run npm i”
then move to the client folder by "$ cd client"
	again npm i
	then come back to the main folder by "$ cd" ..
than write "$ npm run dev", it will run the server and the client concurrently

BE SURE YOU ARE NOT CONNECTED TO A WIFI WHICH PREVENTS THE USE OF PROXY, LIKE THE UNIVERSITY NETWORK, ELSE IT WONT WORK.

bonus features:

1. Posting ability: just like in facebook, we added the ability to post, comment on posts, and the ability to like and
   unlike posts
2. Gravatar:  by using gravater we are able to fetch a profile picture by from the email which was given at the register
   and automatically upload it to the profile.
3. Private routes: - the site looks different for a connected registered user. the connected user has more options.
4. bcryptjs: - we use this library to encrypt the passwords
5. express-validator: - to do a backend check of the requests we received, such as that the email is indeed a valid email address, that the passwords match and so on.
6. Alert: showing alert which pops out with relevant message, for short time.

Features:
REGISTER, LOGIN, LOGOUT  ,NAVIGATE USING NAVBAR, POST, COMMENT ON POSTS, CREATE PROFILE, EDIT PROFILE, DELETE PROFILE, VIEW PROFILE, VIEW PROFILES, SEARCH PROFILE BY LOCATION, NAME AND BOTH, VIEW RESTAURANT, VIEW RESTAURANTS, SEARCH RESTAURANT BY NAME, SEARCH RESTAURANTS BY LOCATION, WRITE REVIEW, EDIT REVIEW, DELETE REVIEW, UPLOAD AVATAR






Design:
Front End (Using React-Redux-Saga):
The React components: 
- The Main component is App which renders all the other components.
- dashboard file contains a group of dashboard components that represent the website’s dashboard.
These components enable you to do multiple actions such as creating and editing your account , delete your account, adding a review as a user and more.
- layout folder contains several components that are responsible for the landing page (when you enter the website) and the navigation bar.  They are responsible for login and logout actions, displaying users profiles and more.
- post and posts folders– responsible for actions such posting posts and comments.
- profiles folders represent the profile views and actions related to the profile- editing it for example.
- Restaurants folders are responsible for the restaurant's view and actions.
Those components render all the restaurants information.
- auth folder components responsible for proper authentication of the user to the website.
Each component also has actions.js, reducer.js and saga.js (if it has API requests).
Backend (Server by express):
The backend was built with Express, adding REST API requests to the db.
  GET – get requested information regarding several users or an specific one,or information about restaurants(or specific one) and reviews.
  PUT – editing existing information regarding the site’s users, restaurant’s reviews, etc.
   POST – creating new reviews, adding new users to the database and more.
Features implemented:
-       All the core features described in the assignment.
Mongoose models:

1. image - each image is an object with a buffer and a string
2. post - A post is an object which has a reference to the USER which posted the post,a text , a likes counter
   the comments which the post received and the date it was posted.
3. Profile - Each PROFILE has a reference to the USER which owns the profile, his restaurants reviews , his location
   , bio, and social network links such as instagram.
4. Restaurant - Each Restaurant has its name, location, reviews, its avatar, and a small text which describes it.
5. USER - when a user registers he creates a new user, the user has a name:STRING, email, passwords and an avatar.

Flow of searching a restaurant by name (example):
1.An event created by the user. 
2.then sending a “POST” to  the back-end (POST api/search)
3.the server replies  to the front-end and updates to the user interface. 
The following result is:
the user enters a name of a restaurant to the search bar by name, then the user clicks on search. 
an event is triggered with the name of that was inserted by the user.
Then an action is triggered which is taken to charge by Saga, then the appropriate function is triggered with the action which in turn calling the server with GET request.
The MONGODB database returns the JSON which contains all the restaurants with the name “user input”.
If the action succeeds the reducer takes care of changes the state of the store.
After the state is updated the user interface is updated and the returned restaurants which were found by the request are rendered.

