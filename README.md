# CareFood - Full-stack Web App for food waste
Full-stack web application for food waste based on ReactJS, PHP, MySQL.

## Table of Contents
   * [Prerequisits - Important](#prerequisits-important)
   * [1. Installation](#1-installation)
      * [1.1. Frontend Setup](#11-frontend-setup)
      * [1.2. Backend Setup](#12-backend-setup)
      * [1.3. Database Setup](#13-database-setup)
   * [2. Configuration](#2-configuration)
      * [2.1. Configuration - Steps](#21-configuration---steps)
      * [2.2. Configuration - Server ports](#22-configuration---server-ports)
      * [2.3. Configuration - Notes](#23-configuration---notes)
   * [3. API Endpoints, URLs and Actions](#3-api-endpoints-urls-and-actions)
      * [3.1. Default URLs](#31-default-urls)
      * [3.2. Endpoints - GET](#32-endpoints---get)
      * [3.3. Endpoints - POST](#33-endpoints---post)
      * [3.4. Endpoints - UPDATE](#34-endpoints---update)
      * [3.5. Endpoints - DELETE](#35-endpoints---delete)
      * [3.6. Endpoints - Exact Methods Path](#36-endpoints---exact-methods-path)
      * [3.7. Actions](#37-actions)
   * [4. Run project - Going live](#4-run-project---going-live)
   * [5. Data Objects](#5-data-objects)
   * [6. Project Contains](#6-project-contains)
   * [7. Folder structure](#7-folder-structure)
   * [8. Useful Information](#8-useful-information)
     * [8.1. Frontend - Optional configs (Included)](#81-frontend---optional-configs-included)
   * [9. Queries](#9-queries)
     * [9.1. User Queries](#91-user-queries)
     * [9.2. Authentication](#92-authentication)
   * [10. Verification and Password Encryption](#10-verification-and-password-encryption)

## Prerequisits (Important)
### **You must have these pre-installed:**
*MySQL Server version 8+* <br />
*NodeJS version 17+* <br />
*PHP version 8+* <br />

### **Frontend packages version requirements:**
*Node SASS version 7+* <br />
*ReactJS version 17+* <br />
*React DOM version 17+* <br />
*React Router version 6+* <br />
*React Scripts version 5+* <br />
*React Styled Components version 5+* <br />
*Fontawesome version 6+* <br />
*Note: These are **already included** in the `package.json` file in the `frontend` folder. <br />

## 1. Installation
A step by step installation process that tells you how to set up the project.

 ### 1.1. Frontend Setup
Go to the `frontend` folder and follow the instructions down bellow:

Install packages:
```
npm i
```
Sets up the project and installs all packages from `package.json`. Wait for the instalation of all packages to complete.

 ### 1.2. Backend Setup 
Configure your MySQL database connection in `backend/classes/MySQL.php`.

 ### 1.3. Database Setup
Mandatory tables can be found in `databases/DB_init.sql`. Run the `.sql` file to create the starter tables for the database.

## 2. Configuration
All neccessary configurations before runing the project. The default setup runs on `localhost`.

### 2.1. Configuration - Steps
1. Go to the `database` folder and open `DB_init.sql`.
2. Execute the sql code on your database to create the neccessary tables.
3. Go to `backend/classes/` and open the file `MySQL.php`.
4. Change the server settings according to yours as follows:
```php
private $server = "localhost"; // Change to domain name. To run on locally type 'localhost'
private $username = "dbusername"; // Change to the admins username of the server
private $password = "dbpassword"; // Change to the admins password of the server
private $database = "dbname"; // Change to the name of the database you would like to connect to on the server
```
5. Go to `frontend/src/api` folder and open the `ApiService.js` file.
6. The `api` constant sets the url to the backend server for the `API calls` in the web app, so make sure the url is the same as your server's url otherwise your website is not going to work (will not communicate with the backend).
```javascript
const api = "https://carefood.store"; // !IMPORTANT: Change it to http://localhost:3000 Backend Server URL

export const userlist = `${api}/users/`;
export const postslist = `${api}/posts/`;
export const changePassword = `${api}/users/passwordreset.php`;
export const createAccount = `${api}/auth/index.php?action=register`;
export const loginAPI = `${api}/auth/index.php?action=login`;
```

### 2.2 Configuration - Server ports
- ***By default*** the backend server runs on port `:3000` <br />
- ***By default*** the frontend server runs on port `:3001` <br />

### 2.3. Configuration - Notes
If you change file or folder names in `backend` and/or `frontend` folders make sure to ***update*** the `includes` in according files. <br />
Make sure your servers ***are not running*** on the same port. <br />
Double check the connection to the database and table names, endpoint urls and server ports. <br />

## 3. API Endpoints, URLs and Actions
Project's default endpoints and paths

### 3.1. Default URLs
- Default **backend** server runs on: `http://localhost:3000` <br />
- Default **frontend** server runs on: `http://localhost:3001` <br />

### 3.2. Endpoints - GET
- Default **users** endpoint: `http://localhost:3000/users/` <br />
- Default **posts** endpoint: `http://localhost:3000/posts/` <br />
- Default **auth** endpoint: `http://localhost:3000/auth/` <br />

### 3.3. Endpoints - POST
- Default **login** endpoint: `http://localhost:3000/auth/index.php` <br />
- Default **register** endpoint: `http://localhost:3000/auth/index.php` <br />

### 3.4. Endpoints - UPDATE
- Default **user** update endpoint: `http://localhost:3000/users/` <br />
- Default **user** password change update endpoint: `http://localhost:3000/users/passwordreset.php` <br />

### 3.5. Endpoints - DELETE
- Default **user** deletion endpoint: `http://localhost:3000/users/` <br />

### 3.6. Endpoints - Exact Methods Path
  **Exact path** to methods. <br />
`$uid` refers to user's unique ***id***. <br />
`$username` refers to user's unique ***username***. <br />

1. User Methods: <br />
- Default **user** get by ***id*** method: `http://localhost:3000/users/index.php?id=$uid` <br />
- Default **user** get by ***username*** method: `http://localhost:3000/users/index.php?id=$username` <br />
- Default **users** get ***all*** method: `http://localhost:3000/users/` <br />
- Default **user** update by ***id*** method: `http://localhost:3000/users/index.php?id=$uid` <br />
- Default **user** delete by ***id*** method: `http://localhost:3000/users/index.php?id=$uid` <br />
- Default **user** password change by ***id*** method: `http://localhost:3000/users/passwordreset.php/?id=$uid` <br />

2. Posts Methods: <br />
- Default **posts** get ***all*** method: `http://localhost:3000/posts/`

### 3.7. Actions
List of all actions and their ***default paths***
<br />
- Default user login action: `http://localhost:3000/auth/index.php?action=login` <br />
- Default user register action: `http://localhost:3000/auth/index.php?action=register` <br />

## 4. Run project - Going live
Step by step how to run the project live on `localhost`.

1. Step #1 - Database <br />
Make sure you have created and running live the MySQL database.
2. Step #2 - Backend <br />
Go to the `backend` folder and run PHP Server with the `index.php` file in that main folder. Note that if you run the server on a different file it will make the web app to not work properly.
3. Step #3 - Frontend <br />
Go to the `frontend` folder and run the Server for the frontend of the web app from that main folder. This will run the app in development mode on `localhost`. <br />

    Start project:
    ```
    npm start
    ```
   3.1. Note: *If you are running the PHP Server on port ***:3000*** it will ask you if it should run the app on a different port e.g. ***:3001***. Then just accept it and it will start the server on that port.*<br />
   - By default the PHP Server should run on `http://localhost:3000`<br />
   - By default the Frontend Server should run on `http://localhost:3001`<br />
4. Step #4 - Enjoy <br />
Create an account and enjoy!

## 5. Data Objects 
1. User PUBLIC API Object
2. Post PUBLIC API Object
3. Auth Object

## 6. Project Contains
This is the list with the available functionalities and features on the project

### 6.1. Functionalities - Currently available
- User Auth: Login/Register system
- Edit User profile
- Delete User profile 
- Search User
- File upload for User Avatar and User Cover Photo
- Add Post 
- Delete Post
- Update Post
- Search Posts
- Add an image to a post

### 6.2. Features - Currently available
- Multiple pages
- Personal Profile Page
- Public User Profiles List Page
- Logged in/out vew
- UI Notification on success/error
- API for Users and Posts
- Responsive customade design
- Sessions - saves Authenticated user in localstorage
- Password encryption
- Fields verification
- Geo location

## 7. Folder structure

1. Main Folders: <br />
`/frontend/..` - The frontend folder contains all of the frontend of the web app. (ReactJS)<br />
`/backend/..` - The backend folder contains all of the backend of the web app. (PHP)<br />
`/database/..` - The database folder contains the default .sql file for the tables in the database. (SQL)<br />

2. Folder Architecture: <br />

## 8. Useful Information
Additional development information about this project

### 8.1. Frontend - Optional configs (Included)
Optinal configs on the **frontend** of the project
   #### 8.1.1 `package.json` config <br />
   ##### 8.1.1.1 Eslint config
```json
"eslintConfig": {
    "extends": [
    "react-app",
    "plugin:import/typescript"
    ],
    "rules": {
    "indent": [
        "error",
        2
    ],
    "comma-dangle": [
        "error",
        "never"
    ],
    "import/order": [
        "error",
        {
        "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
        ],
        "newlines-between": "always-and-inside-groups"
        }
    ],
    "import/extensions": [
        "error",
        {
        "ts": "never",
        "tsx": "never",
        "json": "always"
        }
    ],
    "linebreak-style": "off",
    "react/prop-types": "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "import/no-extraneous-dependencies": "off",
    "no-unused-expressions": [
        2,
        {
        "allowShortCircuit": true,
        "allowTernary": true
        }
    ],
    "no-console": "off",
    "import/prefer-default-export": "off"
    }
}
```

   ##### 8.1.1.2 Browserslist config <br />
```json
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
```

   ##### 8.1.1.3 Developer Dependencies <br />
```json
  "devDependencies": {
    "babel-plugin-macros": "^3.1.0"
  }
```

   ##### 8.1.2 Fontawesome macro `babel-plugin-macros.config.js` <br />
You can create this file in the main `frontend` folder if it doesn't exist. It creates macro for easier importing of icons from Fontawesome.
```javascript
module.exports = {'fontawesome-svg-core': {'license': 'free'}};
```
Import it on every page you would like to use Fontawesome Icons
```javascript
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
```
Example Usage
```javascript
<FontAwesomeIcon pull="right" icon={solid('file-circle-plus')} size="1x" />
```

   ##### 8.1.3 Create production build
Go to the `frontend` folder and run the following command:
```
npm run build
```
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 9. Queries
SQL Statements used in this project: ****``INSERT, SELECT, UPDATE, DELETE``****

### 9.1 User Queries
Default table name **``users``**


- Get specific user by id. Example usage -> `backend/users/index.php` <br />
```PHP
$sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE username = '$userName'";
echo $mySQL->Query($sql, true);
```
<br />


- Get specific user by username. Example usage -> `backend/users/index.php`
```PHP
 $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$userId'";
echo $mySQL->Query($sql, true);   
```
<br />


- Get all users. Example usage -> `backend/users/index.php`
```PHP
$sql = "SELECT id, username, name, image, coverImage, bio, city, fbUsername, igUsername, twUsername, ytUsername FROM users ORDER BY createdAt DESC";
echo $mySQL->Query($sql, true);   
```
<br />


- Update specific user by id. Example usage -> `backend/users/index.php`
```PHP
$sql = "UPDATE users SET name = '$userPersonalName', phone = '$userPhone', city = '$userCity', bio = '$userBio', image = '$userImage', coverImage = '$userCoverImage', fbUsername = '$userFbUsername', igUsername = '$userIgUsername', twUsername = '$userTwUsername', ytUsername = '$userYtUsername' WHERE id = '$userId'";
$mySQL->Query($sql, false);   
```
<br />

- Reset user password. Example usage -> `backend/users/passwordreset.php`
```PHP
$sql = "UPDATE users SET password = '$passEncrypt' WHERE id = '$userId'";
$mySQL->Query($sql, false);
```
<br />

- Delete specific user by id and its posts. Example usage -> `backend/users/index.php`
```PHP
$sql = "DELETE * FROM users INNER JOIN posts WHERE users.id = '$userId' AND posts.uid = '$userId'";
$mySQL->Query($sql, false);   
```


### 9.2 Authentication
Default table name **``users``**

- Create a new user. Example usage -> `backend/auth/index.php`
```PHP
$sql = "INSERT INTO users (mail, username, password) VALUES ('$newUser->mail', '$newUser->username', '$passEncrypt')";
```
<br />

- Login with an existing account. Example usage -> `backend/auth/index.php`
```PHP
// Check if it is the right password for that username
if (password_verify($password, $user->password)) {
    $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$user->id'";
    $user = $mySQL->Query($sql, false)->fetch_object();
    $response['authenticated'] = TRUE;
    $response['user'] = $user;
    echo json_encode($response);
} else {
    $response['authenticated'] = FALSE;
    $response['error'] = "Wrong password";
    echo json_encode($response);
}
```

## 10. Verification and Password Encryption
Field verification with: `htmlentities( , ENT_QUOTES)`
Password enxryption with: `password_verify()`
