* docker run -d -t --name counter --rm -v %cd%/services/counter:/app node:18
* docker exec -it counter bash
* npm init -y
* npm i -D nodemon
* curl  -H "Content-Type: application/json" -X POST http://localhost:81/Dima
* docker network inspect library-app_default
* docker compose -f docker-compose.dev.yml up --build
* docker rmi $(docker images -a -q)