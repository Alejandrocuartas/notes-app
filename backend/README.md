# NestJS Project

## Requirements

- Node.js v18.19.0
- NestJS CLI: Install globally using `npm i -g @nestjs/cli`

## Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/ensolvers-github-challenges/CuartasMarin-0a5026.git
   
   cd CuartasMarin-0a5026
   
   git pull origin main

2. Install dependencies:

   ```bash
   cd backend
   
   npm install

## Environment Variables

    The parameters for a PostgreSQL DB.

    DB_HOST=  
    DB_PORT=  
    DB_USERNAME=  
    DB_PASSWORD=  
    DB_NAME=

## Running the Project

    npm run start:dev

## API Documentation

   For detailed API documentation, visit the following [Postman Collection](https://www.postman.com/orbital-module-geoscientist-50527574/workspace/notes-app/collection/15967321-10354404-754d-43c8-ae07-ed4d84bda86e?action=share&creator=15967321)

## Deploy

    The Server is running on a Amazon EC2 instance. I used Amazon API Gateway and Lambda to create a proxy and avoid
    security problems. The base url is: https://12463o22k0.execute-api.us-east-1.amazonaws.com/default

## DB Schema
![database schema](https://public-ale31jo.s3.amazonaws.com/notes.drawio.png)
