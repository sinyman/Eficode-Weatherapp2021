# Eficode Weatherapp (Summer job 2021)
This is my submission repository for the Eficode summer job 2021 coding assignment
My version running on an AWS server can be found [here!](http://13.48.27.231:8000/) with the [backend API runnning here](http://13.48.27.231:9000/api/weather)

Assignments and other provided info is found in [here!](./assignment.md)

## How to use it?
### Prerequisites

* An [OpenWeatherMap (OWM)](http://openweathermap.org/) API key.

### Development
When developing it is recommended to clone the source code to your local machine.

Firstly, place your OWM API-key in a .backend.env-file ; Here is [an example .backend.env file](./backend/.env.example) showing preferred syntax. Copy this file and create a file called ".backend.env" where you place your API-key and other environment related data.

A in the root of this repository is a [basic docker-compose.yml file](docker-compose,yml) that will build images of the code and setup a development server with container hot reload locally. The development environment can be started with the following command:
```
$ docker-compose up --build
```
(the -d flag can be used to run detached docker-compose in the background)</br>
</br>

Now you can write code to your hearts desire and the docker-container will keep showing you the live code as it changes.

Bring down the development environment docker-compose with `Ctrl-C`. If you are running docker-compose in detached mode (-d flag) you can stop the containers with the command 
```
$ docker-compose down
```
</br>

#### Taking the developed app to production
Both the backend and the frontend have their own Dockerfiles that server for building images of respective service. By running the command:
```
$ docker build -t {tagname} .
```
in either directory will create an image of that service, that can later be pushed to [DockerHub](https://hub.docker.com/) and used in a production environment. More info about that [here!](https://docs.docker.com/docker-hub/repos/#:~:text=To%20push%20an%20image%20to,docs%2Fbase%3Atesting%20))</br>
</br>

### Production
For space-saving reasons in production it is recommended to deploy the application through docker images found on DockerHub: [Backend](https://hub.docker.com/repository/docker/sinyman/weatherapp_backend) & [Frontend](https://hub.docker.com/repository/docker/sinyman/weatherapp_frontend).


#### Getting the images
After installing docker on the server/cloud instance you can get the images with
```
$ docker pull {dockerhubUser/imagename:tag}
```

</br>

For example:
```
$ docker pull sinyman/weatherapp_frontend:2
```

You can verify that the images have been downloaded with
```
$ docker images
```

Which should return a list containing info about the images and their tags, dates and sizes</br>
</br>

#### Setting up the environment variables
In the repository root is a example file for creating environment variable files that docker-compose will pick up.

Firstly, place your OWM API-key in a .backend.env-file ; Here is [an example .backend.env file](./backend/.env.example) showing preferred syntax. Copy this file and create a file called ".backend.env" where you place your API-key and other environment related data.

As of now (23.3 2021), the only environment variables needed are a link to the backend API endpoint and an OWM API-key, Syntax-related matters are found in the examplefiles! [.backend.env](./.backend.env.example) & [.prod-variables.env](./.prod-variables.env.example)

<b>OBS!</b> The official environment files are called ".prod-variables.env" & ".backend.env". Docker-compose is looking for these and will not find them unless correcly named <b>OBS!</b></br>
</br>
  
#### Running the application
The application is run with docker-compose using the [production docker-compose file named "docker-compose-prod.yml".](./docker-compose-prod.yml)

The supplied docker-compose production file can easily be downloaded to your server/cloud instance with WGet using the following command:
```
$ wget https://raw.githubusercontent.com/sinyman/Eficode-Weatherapp2021/master/docker-compose-prod.yml
```
</br>

To run the application enter the following command in the directory where the docker-compose file is located

```
$ docker-compose -f docker-compose-prod.yml up
```

(the -d flag can be used to run detached docker-compose in the background)</br>
</br>

Depending on your port-settings the app should now be running and accessible on ports 8000 (Frontend) and 9000(backend). The frontend can be directed to use another port than 8000, by binding the wanted port number to internal container port 8000. For example `80:8000` for easy access only through the hostname/ip-address.</br>
</br>
#### Stopping the containers
Bring down the docker-compose with `Ctrl-C`. If you are running docker-compose in detached, headless mode (-d flag) you can stop the containers with the command 
```
$ docker-compose down
```


## Infrastructure
The application is a simple service consisting of a React.js frontend and a Node.js Koa backend running in 2 different Docker containers, all orchestrated by Docker-compose. The frontend fetches weatherdata from the API running in the backend, which in turn presents the data it gets from [OpenWeatherMap APIs.](https://openweathermap.org/api)
