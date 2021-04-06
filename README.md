# flix-for-fun-client

![flix-for-fun-login-page](/IMG/flix-for-fun-login.PNG)


## Project-Description:

This is a single-page web application created to allow registered/logged-in users to discover new movies and find related information on them. This project builds the client-side of the application using the React framework combined with Redux to pass down required props from the store to the class/functional components that need it. Users are able to use the provided filter searchbar to filter through the list of available movies fetched from the online database. Users will be able to find movie information such as title, description, the genre info, and the director info. The genre info will give information on the name of the genre and the description of that genre. The director info will give information on the director's name, biography, date of birth, and date of death(if applicable). Users will be allowed to add the movies they are interested in to their 'Favorites-List" from the view page of each individual movie. Once added, the "add-to-favorite" button will show that it is already added and persists when the page is refreshedor later visited. They will also be allowed to update their existing information, or delete their existing profile. Each RESTful API request is checked with JWT token for authorization each time the user wants to navigate to the certain page or perform a certain CRUD action. Proptypes are also used to check that the correct prop-types has been passed from store to component. 

![flix-for-fun-main-page](/IMG/flix-for-fun-main-page.PNG)


## Ways to get the Project Running:

1. Visit the the github repository "https://github.com/yueymiqua/flix-for-fun-client"
2. Create a copy of the repository and put it on your local desktop.
3. Navigate to the root directory of the project and install all required dependancies by typing "npm install" on the CLI
4. Make sure parcel is installed as that is the build-tool that will be used to build the project to start running locally.
5. Type "parcel src/index.html" onto your CLI and wait for build to complete.
6. In a browser, navigate the address bar to url "http://localhost:1234" to reach the login page
7. If you are a new user, register an account and you will be required to login via the login page once profile is create.
8. Login and happy flix surfing!


## Project Endpoints:

### Navigable Endpoints: 
 - main-view: "/"
 - login-view: "/login"
 - registration-view: "/register"
 - movie-view: "/movies/:movieId"
 - director-view: "/movies/directors/:Name"
 - genre-view: "/movies/genres/:Name"
 - profile-view: "/users/:Username" (also used for updating or deleting the profile)

### Non-navigable Endpoints:
 - "/users": getting a list of all users
 - "/users/:Username/Movies/:MovieID": adding/deleting a movie to Favorites List


## Project Dependancies:

### Local-Depandancies:
"axios": "^0.21.1",
"prop-types": "^15.7.2",
"react": "^17.0.1",
"react-bootstrap": "^1.5.2",
"react-dom": "^17.0.1",
"react-redux": "^7.2.3",
"react-router-dom": "^5.2.0",
"redux": "^4.0.5",
"redux-devtools-extension": "^2.13.9",
"parcel-bundler": "^1.10.1"

### Dev-Dependancies:
"babel-core": "^6.26.3",
"babel-plugin-transform-class-properties": "^6.24.1",
"babel-preset-env": "^1.7.0",
"babel-preset-react": "^6.24.1",
"sass": "^1.32.8"


## Which API the project uses:  

**Full server-side project can be found in the other repository "https://github.com/yueymiqua/flix-for-fun"**
 - Node.js and Express.js for server-side/backend programming
 - Data is stored in noQSL database (MongoDB)
 - The database is also hosted online with MongoDB Atlas
 - The website is hosted online by Heroku (Platform as a Service)
 