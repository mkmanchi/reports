# Assessment to create a page for balance sheet from Xero

Assuming the Xero is running in the container with Port "3001" as below.

Docker Hub Image:
`https://hub.docker.com/r/jaypeng2015/show-me-the-money`

Host URL:
`http://localhost:3001/api.xro/2.0/Reports/BalanceSheet`

## Backend - React

### Docker setup

#### Create an image for the Docker and expose port "3002"

`docker build -t my-node-app ./nodeapi`

### Run the container

`docker run -it -p 3002:3002 node-backend`

## Frontend - React+Typescript

### Docker setup

#### Create an image for the Docker

`docker build -t react-app ./reports`

#### Run the created Docker

`docker run -it -p 2649:2649 react-app`

Once both frontend and backend is running, you can access the balance sheet UI from below URL

`http://localhost:2649/`

Thats it !!!

Thanks,

Mahendra Manchi
