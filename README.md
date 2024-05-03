# Employee Creator/Manager

## Demo

![demo of project](demo.gif)

## MVP / Recommendations

We need a web application to create, list, modify and delete employees. The application should consist of a spring RESTful API and a React Typescript frontend. The schema for the employee is left to the criteria of the candidate.

The list can be a local database, CSV, TXT file or even in memory
Implementing an API logging strategy.
Implementing error handling strategy.
At least 3 endpoints are required:
To create an employee
To get a list of existing employees
To delete an employee

React Redux is recommended.
Typescript is recommended.
React hooks are recommended.
React create app is a good starting point.
You can include any other open source NPM library.
Feel free to use your favorite CSS framework.
Feel free to use your favorite middleware.
Add some basic validations on the form like required and max length validations.
The site should be responsive.

- API has: create employee, list of existing employees, delete employee
- Front-end has: View Employee List (with delete option), Add Employee Form. Routed.

- context doesn't inherently enfore uni-directional data flow while RR does
- this just means that when child componenents want to change state they can't do it directly but will notify the Redux store through dispatching an action. The Store will then update the state using reducers and pass down to children through props. Each reducer handles a specific slice of the application state. It will check whether a re-render is necessary instead of automatically doing it like the useContext hook.
- note that useState hooks' states will operate independently to that of Redux Store state

## Hosting

Front-end hosted link (netlify): https://superlative-cocada-2236c6.netlify.app
- I chose to use Netlify for the the front-end because I wanted to practice configuring Netlify to host from an internal directory
- This is the first time I've achieved this
- The key was to make sure a dist file is being created 

Springboot/mySQL back-end hosted link (Docker Container on AWS): coming soon
- Not going to lie this has been an uphill battle but one with lots of new concepts learned
- I struggled with containerising the SB (Maven) back-end and the mySQL Database together
- The key was to get the correct build logic in the docker-compose and Dockerfile
- Another important concept was that off the local and hosted ports
- The server needed to be set to 3000:8080 and the database was set to 3007:3006
- Currently, the Docker container has been made - I just need to connect it to an EC2 instance

## Future Changes
- Currently, the Home Page does not have any function
- It will be updated soon to allow for log-in
- Depending on the account, the user will/wont be able to access the Employee Info Modal

## Features

## Planning 

In this project, I will be focussing on: 
- ensuring my Components are resuable and that they do not handle data/logic themselves (this should be handled by the parent Containers).
- Using eNums for states that determine rendering. Extensive error handling for the forms.
- Implementing React Redux instead of the useContext Hook.
- Extensive error handling on the back-end.
- Testing on both sides.
- Logical relationships between tables/columns in mySQL

## Change Log

### 10th April
- set up front-end and back-end files
- imported the dependencies: Spring Web, Validation I/O, Spring Testing, Spring Data JPA, MySQL Driver, Spring Devtools.
- finalised planning (file in root folder)

### 11th April
- Fleshed out front-end: basic form of all components complete, except the form which is almost done (routes added)
- Added the Employee entity including its eNums to the back-end

### 12th April
- iniialised the files for front and back end - made all components and classes
- finished off the planning

### 14th April
- finished out hooking up react-hook-form with my project - ready to be integrated with back-end

### 20th April
- Completed the Service, Controller & UpdateEmployeDTO classes.
- Completed the error handling package by adding NotFoundException, ServiceValidationException, GlobalExceptionHandler
- fleshed out CSS and banner component
- title updates depending on which route/page

### 23rd April
- Added zod error handling
- this required extra handling for number inputs

### 31st April
- Added sort and search bar functionality to the dashboard
- Their state containing the updated Employee List needed to be handled together to get them to work syncronously 
- also added in Home Page tab which will be used later down the track for authentication

### 2nd May
- finally fixed the issues I was having containerising my Back-end & Database
- successfully containerised the back-end (server and database_

```yml
version: "3.8"

services:
  app:
    build:
      context: ./employee.creator.back_end
      dockerfile: Dockerfile
    ports:
      - "3000:8080"
    depends_on:
      db:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/${DB_NAME}
      SPRING_DATASOURCE_USERNAME: ${DB_USER}
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./employee.creator.back_end/src:/app/src
      - ./employee.creator.back_end/pom.xml:/app/pom.xml
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "curl --fail http://localhost:8080/actuator/health || exit 1",
        ]
      interval: 10s
      timeout: 10s
      retries: 5

  db:
    image: mysql:latest
    platform: linux/amd64/v8
    environment:
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_ROOT_PASSWORD: ${ROOT_PASSWORD}
    ports:
      - "3307:3306"
    volumes:
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./database/mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

volumes:
  mysql-data:
```
- this was how I got my yml to work
- interestingly it still worked when I had the incorrect config for the app volumes but I have since updated the file and container
- https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:
