# REST API

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Technicals](#technicals)
  - [Tech Stack](#tech-stack)
  - [Repo Structure](#repo-structure)
  - [Setup](#setup)


## About

This directory contains the source code of a simple backend. The backend provides CRUD operations revolving `employee` data.

## Technicals

### Tech Stack
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
<!-- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) -->


### Repo Structure

This project structure adopted some, if not all, of aspect in Uncle Bob's Clean Architecture. The source code consists of these directories along with their responsibilities:

- **Routers**. Defines the endpoint routes available in the app
- **Controller**. Handles the incoming request such as extracting data from the request, do basic parameter or data checking before being passed to application service, and manages the response.
- **Services**. This refers to application service which orchestrates the series of instructions and the responsible modules to fulfill the request.
- **Domain**. Defines the business rules and constraint the data has to comply to protect the integrity of the data within the database.
- **Repository**. Provides an interface to access the persistence layer.
- **Middlewares**. Provides additional functionality to Express router.
- **Lib**. Provides reusable functionalities, usually in form of an interface to in-house or external libraries .

### Setup

> Please have `npm` and `nodejs` installed on your machine before going through the steps

Follow the following steps to be able to run and modify this project on your machine:

1. Install the required dependencies. On the same directory as `package.json`, enter:

    ```
    npm i
    ```

2. Setup required environment variables by creating `.env` files on the same directory as `env.ts`. Consult the required variables in `.env.example`. Here is an example of it:
    ```
    APP_MODE=DEV
    APP_PORT=8000
    ```

3. Run the development server

    ```
    npm run dev
    ```

4. Check the [following documentation](https://htpz255fbx.apidog.io) for the list of available endpoints. 

    > Note: For working solution, please use the `cUrl` (or something similar) provided in the documentation to do the request. As the time of writing, I still can't make the Apidog documentation UI make proper request to local server.


