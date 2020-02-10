# MERN Medium CMS
This is my first app using MERN (Mongo, Express, React, Node) app

## Configuration

Create environment on file config/config.env
> NODE_ENV=development
> PORT=5000
> mongoURI=mongodb://localhost:mern-cms/mern-cms
> JWT_SECRET=secret
> JWT_EXPIRE=30d
> JWT_COOKIE_EXPIRE=30
> CLIENT_PUBLIC_PATH=./client/public
> FILE_UPLOAD_DIRECTORY=uploads
> FILE_IMAGE_DIRECTORY=images
> FILE_STATIC_DIRECTORY=static
> MAX_FILE_UPLOAD=1000000


## Installation

Install both package in server and client
```sh
$ npm i
$ cd client
$ npm i
```

## Run Application
Start your mongo service
```sh
$ sudo service mongod start
```
Run dev scripts
```sh
$ npm run dev
```

access on your chrome `localhost:3000`

## Seeding (!important)

Seed before use the app (the empty data handler still not created, i will added ASAP)
```sh
$ npm run seed-story
```

PROFIT!!!
