### Using the API
Some important endpoints
```bash
http GET localhost:3001/cars

http GET localhost:3001/cars/:id

http GET localhost:3001/cars/limit/num

http POST localhost:3001/cars -j <<< '{"key": "value"}'

http PUT localhost:3001/cars/:id -j <<< '{"key": "value"}'

http GET localhost:3001/comment

http POST localhost:3001/comment

http GET localhost:3001/index off==1 lim==1

http GET localhost:3001/popular
```
### Getting Started
```bash
brew install postgresql@14
git clone '<repo>'
cd carsBackend/src
npm install

touch .env >> 'PORT=3001
PG_HOST=localhost
PG_PORT=
PG_DATABASE=cars
PG_USER=
```
```bash
npm run db:init
npm run db:seed
```
### Erd diagram
![erd](https://i.imgur.com/zevkTY6.png)