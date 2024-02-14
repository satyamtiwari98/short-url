NodeJs services for short url created with the help NodeJS, ExpressJS, and MongoDB.

# MERN Short URL Generator

This is a simple URL shortening service built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- Shorten long URLs into unique short codes
- Redirect users from short codes to original URLs
- View analytics on shortened URLs (number of clicks, etc.)

## Technologies Used

- MongoDB: Database to store original URLs and their corresponding short codes
- Express.js: Node.js framework for building the RESTful API
- React.js: Frontend framework for the user interface
- Node.js: Backend runtime environment
- Shortid: Library for generating unique short codes
- Axios: HTTP client for making requests to the backend API

## Installation

1.Clone the repository:

```bash
git clone https://github.com/satyamtiwari98/short-url.git
'''

2.Navigate to the project directory:
'''bash
  cd short-url
'''
3.Install dependencies:
'''bash
  npm install
'''
4. Run the application:

'''bash  npm start '''

## Usage

Access the application at http://localhost:3001 in your web browser.
Enter a long URL in the input field and click "Shorten" to generate a short URL.
Copy the short URL and share it with others.

Users can use the short URL to access the original page, and the application will redirect them.

