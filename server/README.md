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
