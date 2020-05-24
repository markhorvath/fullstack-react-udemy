1. In project, mkdir server, cd server
2. npm init, enter through options
3. Install express, npm install --save express
4. Run on local, node index.js
5. Create and setup index.js file, update package.json "scripts" to run
npm start, also added "engines" with node and npm versions he specified
##DEPLOYING TO HEROKU
6. Setup Heroku account (already had), `brew help` to check homebrew installed
7. `brew install heroku` in Server dir (this updated homebrew first for me)
8. `heroku login`, enter credentials
9. `heroku create` which error'd out
10. tried `brew install heroku/brew/heroku` but that error'd too
11. `heroku create` works now?!
12. `git remote add heroku https://git.heroku.com/peaceful-fortress-73061.git
` which adds a remote repository to our current repository
13. `git push heroku master`
14. `heroku open` Application Error in browser
15. `heroku logs`
16.  This didn't work, so deleted my server in heroku dashboard and then:
rm -r .git
Then, make sure you are running these commands at the same level as your
project's package.json file:
git init
heroku git:remote -a YOUR_NEW_HEROKU_ENDPOINT
git add .
git commit -m "restarting"
git push heroku master
17. I hadn't saved my index.js or readme files which weren't being committed,
this caused the problems.  After running through 16 a 2nd time with the files
committed, `heroku open` worked.  smh (https://react-fullstack-trial.herokuapp.com/)
###FUTURE DEPLOYMENTS
18. in server dir, run the following:
- `git status`
- `git add .``
- git commit -m "message"
- git push heroku master
##GOOGLE OAUTH
###PASSPORTJS SETUP (http://www.passportjs.org/docs/)
1. passport has general helpers for handling auth in express
2. passport 'strategies' are helpers for specific methods (email/pw, Google, fb)
3. in 'server', run `npm install --save passport passport-google-oauth20`, which
installs passport and the strategy for google oauth
(https://github.com/jaredhanson/passport-google-oauth2)
4. Go to console.google.developers.com
5. Click create new project, name it
6. Click Enable API's, search for Google+ (that's for google oauth)
7. Click Create Credentials (make sure you're in the new project)
8. Click Configure Consent Screen, choose Internal or External
9. Next screen just needs a project name
10. Go back to Credentials, click create and OAuth client ID
11. Select 'Web Application', keep name 'Web Client 1' is fine
12. Add Authorized Javascript Origins of 'http://localhost:5000'
13. Authorized redirect URIs: 'http://localhost:5000/auth/google/callback'
14. Create, then copy client & Secret ID from pop-up
15. Add 'config' dir in 'server' dir, then create keys.js files
16. Add object with keys, then add keys.js to new line in .gitignore file
17. Add keys.js to index.js, add GoogleStrategy, a few route handlers for
google oauth (see commits or code comments)
18. Add callback Redirect URI to Google Dev Console Oauth Client ID
(http://localhost:5000/auth/google/callback)
###Nodemon
20. `npm install --save nodemon`
21. in package.json, add "dev" to scripts with value "nodemon index.js" to
start server in dev mode
###REFACTORING
22. Added routes/authRoutes.js and services/passport.js.  Refactored index.js
##MONGODB SETUP
23. www.mongodb.com/cloud/atlas, start free account
24. Create cluster, leave all free default options selected
25. Name the app, then click "Create Cluster"
26. Click "Connect", then "Add Your Current IP Address"
27. Create database user and pw, recommend using 'Autogenerate' (copy pw?), then "Create User"
28. If successful, click "Choose a connection method"
29. "Connect Your Application"
30. Copy the address under "Connection String Only".  Replace <PASSWORD> with
database user's password created earlier, then click Close
31. Back in the app config/keys.js file, create 'mongoURI: ' key-value pair
32. The value should be the entire Connection String used earlier w/user pw
33. To connect index.js to this, use `mongoose.connect(keys.mongoURI)`
34. `npm install --save mongoose`
35. Was getting bad auth error when trying to connect to MongoDB, ultimately
had to go into Mongo > Database Access > EDIT my user then regenerate pw.
After adding the new pw to keys.js I was able to connect.  
36. Replace earlier mongoose connect with the following:
`mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log('Error on start: ' + err.stack));`
  **REMEMBER FOR FUTURE: ALWAYS SETUP DB CONNECT FUNCTION TO LOG WHETHER ITS
  SUCCESSFUL AND IF NOT THROW WHATEVER ERROR**
##CODING MongoDB
37. Created new folder + file: models/User.js to separate future models
38. Add library to help w/cookies: `npm install --save cookie-session`
##ADDING PROD DATABASE
39. Log into MongoDB, in upper left corner look for project dropdown, click new project
40. Name it then Create Project.
41. Build a Cluster, leave all 'Free' options for now, then Create Cluster
42. Click Connect, Add a Different IP address, enter 0.0.0.0/0 and click 'Add'
43. In a real production app you would typically have a static IP and a Fully Qualified Domain Name. In this case we would whitelist only the static IP. You can read up on this more here:
https://help.heroku.com/JS13Y78I/i-need-to-whitelist-heroku-dynos-what-are-ip-address-ranges-in-use-at-heroku
44. Enter new username and autogenerate password, copy password before 'Next'
45. 'Choose a connection method', then 'Connect your Application'
46. Copy the address under 'Connection String Only', replace PW
47. Go to google dev console, create new project for prod
48. When configuring oauth consent screen, you must add the website domain
49. Then you can add the redirect URI for the callback
50. Create dev.js, move keys.js content over, dev.js will not be committed
51. when you deploy your code to a server, there's an existing variable called
node_env, which tells us whether we're in dev or production
52. keys.js determines whether in dev or prod, dev.js had dev keys and is not
committed, prod.js uses variable names for keys that are stored on heroku.  
53. Log into heroku, go to app > Settings > find Confige Variables, add them
54. Add proxy: true to GoogleStrategy in passport.js, this solves issue with Redirect URI
##CLIENT SIDE / REACT
55. In server dir, `npx create-react-app client` (you can take client out of server in future)
56. Add "client": "npm run start --prefix client" script to *server* package.json (--prefix client tells it to run in client dir)
57. Add "dev": "concurrently \"npm run server\" \"npm run client\"" same as above,
also changed the old "dev" script name to "server"
58. In server, `npm install --save concurrently`, lets npm run multiple commands/servers at once
59. Made some adjustments to server dir package.json file
60. Issue with proxy, had to run `npm install http-proxy-middleware@0.21.0` in *client* dir
61. Create setupProxy.js in client/src, this is automatically looked for by the middleware we just installed
62. Add the code to setup the proxy we want to use e(localhost:5000).
63. Make sure you don't have the proxy in your client package.json
64. This basically says that if anyone tries to use the specified relatives paths
in our Client side react (/api, /auth/google), then use the designated url "localhost:5000"
as a proxy for the domain.
##DEVELOPING CLIENT SIDE
65. Deleted all the default react stuff from npx create react app as usual
66. In client/src create index.js for the data layer control (redux)
67. In client/src/components create App.js for rendering layer control (react router)
68. Remember there are TWO package.json files now, one in main server dir and
one in the server/client dir, so navigate to client dir
####REACT REDUX,
69. `npm install --save redux react-redux react-router-dom`
70. Add react and reactDOM to index.js
71. Add `import { Provider } from 'react-redux';` and `import { createStore, applyMiddleware } from 'redux';` to index.js
72. Create redux store at top level of app (index.js), hook it up to react side of app
by using the Provider tag and placing App component within it
####REDUCERS
73. Create reducers folder, authReducer.js and index.js.  These will get sent to the store
74. authReducer.js default returns state object, gets imported by reducers/index.js,
then that reducers/index.js exports it as combineReducers with key value of 'auth' (our name)
and then imported as reducers in the main index.js.  Then it's added as the first argument
to combineReducers in index.js
####REACT-ROUTER
75. index.js kinda controls the data layer, App.js controls the View, which is related to the routes
76. import {BrowseRouter, Route} from 'react-router-dom' in App.js
77. Add <BroswerRouter> component to App.js, it can only have one child
78. Add
        `<div>
          <Route path="/" component={Landing} />
        </div>` to BrowserRouter component to test it's working
79. Adding `exact` (short for exact={true}) attr to Route component ensures the 'to' path
only renders when the path is exact.  In this case we add it for the Route to "/"
80. Created class based Header component
81. Added Materialize CSS with `npm install --save materialize-css` in client, import it (index.js in this case)
####ACTION CREATORS
82. in client, `npm install --save axios redux-thunk`
83. import redux-thunk in index.js, pass it as argument to applyMiddleware
The purpose of redux-thunk as the arg to applyMiddleware is to inspect whatever
value we return from the action creators.  If redux-thunk sees we return a function
instead of a normal action, redux-thunk will automatically call the function and
pass in the dispatch function as an argument (see actions/index.js) ie dispatch is a function
84. added /actions folder, and index.js / types.js within it
85. NAs
86. Refactored App.js to class-based component, added componentDidMount
87. import { connect } from react-redux to make react and redux work together
88. import all action creators from actions dir
####INSTALL STRIPE
89. Signup with stripe.com and get test api keys
90. `npm install --save react-stripe-checkout`
91. Add keys to config files, setup new keys in heroku (https://dashboard.heroku.com/apps/APP-NAME/settings)
####ENV VARIABLES ON REACT
92. Info here https://create-react-app.dev/docs/adding-custom-environment-variables
93. We'll create a permanent dev environment variable, but you could also create
a temporary one through your shell
94. these are client-side, so create .env files in client dir
####SETUP Stripe
95. Created Payments component with react-checkout-stripe, it needs "amount,
token, stripekey" attributes (the latter is the key we setup above)
96. Render Payments in Header
97. Added handleToken action creator in actions/index.js
98. Added billingRoutes to /routes dir, wrote code for post request to stripe API
99. `npm install --save stripe` in server dir, library allows us to make request to API
100. installed body-parser (https://www.npmjs.com/package/body-parser)
this is something required by express in order to parse post requests
101. `npm install --save body-parser`
102. `body-parser` apparently doesn't work, removed and use express.json() instead
103. Server wasn't running, had to reinstall concurrently for some reason
104. Added stripe.charges.create object to billingRoutes post req
105. Added functionality to update user credits (also updated User schema in models dir)
106. Added new middleware to check if user is logged in, add to billingRoutes
####Redeploying to Production (Heroku)
107. in client dir, run `npm run build`
108. Add logic in main index.js to run certain code on production env only
including to look for files in client/build (see comments)
109. https://devcenter.heroku.com/articles/nodejs-support#build-behavior
110. Add "heroku-postbuild": ""NPM_CONFIG_PRODUCTION=false npm install --prefix
client && npm run build --prefix client" to scripts in server package.json
111. --prefix client tells it to install whatever dependencies are in client dir
and to run build on whatevers in client dir.
112. in server dir, git add ., git commit, git push heroku master
113. Had to debug a couple things, make sure the server version of package.json
node version in "engine" is the same as on my local and is at least the LTS version
Also realized i had the Stripe publishableKey in gitignore on prod so had to remove that
####Mongoose for Survey Creation
114. Setup Survey.js model for mongodb, require it in index.js
115. Created Recipient.js model, which is a subdocument of Survey.js
116. Created SurveyRoutes.js in /routes dir, required it in index.js
117. Update Survey.js with new schema key/values
118. Created requireCredits.js middleware, very similar to requireLogin
119. Require mongoose in SurveyRoutes, setup survey instance, turn recipients
from array of strings to array of objects w/email address
120. There was more to this, but the sendgrid stuff was such a pain just skip it
####Client side surveys
121. 
