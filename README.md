# favorites
MVP for the social network for the athletes

npm install
npm run sequelize db:create

// create local folder for postgres data
mkdir pg_data

npm start

// go into postgresql image
docker run -it --rm --mount type=bind,source=$PATH_TO_PG_DATA,target=/var/lib/postgresql/data postgres psql -h postgres -U postgres

// run sequelize comand
npm run sequelize migration:generate -- --name some_name

// run the docker image and get connections
docker run -p 5432:5432 -it --rm -e POSTGRES_PASSWORD=my_new_pass -e POSTGRES_DB=favorites_db --mount type=bind,source=$PATH_TO_PG_DATA,target=/var/lib/postgresql/data mdillon/postgis