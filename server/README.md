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
committed, `heroku open` worked.  smh
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
