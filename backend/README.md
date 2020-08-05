## TODO
------
- Identity user
- User class and repo


## Backend files here
------
### Endpoints
The graphql backend endpoint is served on port 5000.
The standard endpoint is found at
``` http://localhost:5000 ```
While the playground midleware is found at
``` http://localhost:5000/playground ```

## Database
To run this backend, it needs to connect to a database.
Here we use the NoSQL database MongoDB. The easiest way to run this database is as a docker container.
The perfered image is:
``` mongo:4.0.4 ```
Using docker this image can be pulled down localy.

Tu run the database in docker, use the command:
``` docker run --name RecWeb -p 27017:27017 mongo:4.0.4 ```
This runs a docker container with name RecWeb using the MongoDB image version 4.0.4, exposing port 27017.

To access the database with shell commands, use the command below:
``` docker exit -it RecWeb bash ```
This accessed the bash shell of the docker container.
Use the command ``` mongo ``` to access the mongodb commands.


## Queries
- TODO


## Mutations
- TODO