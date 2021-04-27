# flix-for-fun-client

![flix-for-fun-login-page](/IMG/flix-for-fun-login.PNG)


## Project-Description:

This is a single-page web application created to allow registered/logged-in users to discover new movies and find related information on them. This project builds the client-side of the application using the React framework combined with Redux to pass down required props from the store to the class/functional components that need it. Users are able to use the provided filter searchbar to filter through the list of available movies fetched from the online database. Users will be able to find movie information such as title, description, the genre info, and the director info. The genre info will give information on the name of the genre and the description of that genre. The director info will give information on the director's name, biography, date of birth, and date of death(if applicable). Users will be allowed to add the movies they are interested in to their 'Favorites-List" from the view page of each individual movie. Once added, the "add-to-favorite" button will show that it is already added and persists when the page is refreshedor later visited. They will also be allowed to update their existing information, or delete their existing profile. Each RESTful API request is checked with JWT token for authorization each time the user wants to navigate to the certain page or perform a certain CRUD action. Proptypes are also used to check that the correct prop-types has been passed from store to component. 

My experience with using Redux in this project has been a mix as I have encountered both the advantages vs. disadvantages of using it. On one hand, Redux is very clear-cut in terms of being obvious in which props are being passed into each component from the Redux store. You don't have to worry about forgetting to pass certain props down from a parent to a further down child component because at any time you can connect store to any component in the application. Redux is also very scaleable as you can add new action types and reducers as the application becomes further developed and you realize, for example, another important state is now required to be added. As reducers are pure functions without any side-effects, your outcome is always consistent and variables will be unmutated. On the other hand, Redux does require some setup time and therefore generally less beneficial for smaller application. The nature of Redux that maps state to component props is also asynchronous, so you have to be careful and constantly do checks to see if your render/lifecycle methods are working with a defined prop, otherwise the code will break and an error will occur. At many times, I had to evaluate what was happening and find a work-around solution or a pattern to overcome the problems I was facing in Redux/React. Overall very valuable, deep-diving experience into this framework from building this interesting web application.

![flix-for-fun-main-page](/IMG/flix-for-fun-main-page.PNG)


## Ways to get the Project Running:

### Method 1 - visit https://flix-for-fun-app.netlify.app/ (website hosted on Netlify)
For a test login, you may use Username: johndoe Password: johndoe

### Method 2 - Clone repo and run it locally
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
 