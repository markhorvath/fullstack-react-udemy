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
