# gipfeli.io Frontend

![](https://github.com/gipfeli-io/gipfeli-frontend/actions/workflows/ci.yml/badge.svg?branch=stage)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

> **_Note:_** If you copy the .env.example file to create a new .env file please be aware that comments on the same
> line as variables (e.g. `SOME_VAR= #this is the comment`) must be removed, otherwise there will be build errors.

1. Clone the repository
2. Run `npm i` to set up all dependencies
3. Create a `.env` file based on the `.env.example` and adjust the values 
   You're free in configuring most of the variables as per the ./gipfeli-frontend/.env.example file except for:
   - REACT_APP_STORAGE_BUCKET_BASE_URL: Set to the base URL of your Google Storage bucket. Ask the gipfeli.io team for help.
4. Run `npm start` to get a development process with hot-reloading running

> **_Info:_**
> If you want to test the offline functionality you have to run the application using `npm start:prod`. The offline functionality
> needs a running service worker which will only be activated when running the application in production mode (this is per design
> as hot-reloading a service worker will result in unexpected behavior). The best way to test is to use the private mode of the browser 
> as this will always give you a fresh environment. But please be aware that Firefox private mode does not allow
> for IndexedDB usage.

## Tests

Run the testsuite using `npm run test`. This will run all tests.

## Build

In order to create a production-ready build, run `npm run build`.
