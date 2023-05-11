# Dynamic Branch Map

This project displays an interactive map with the locations of all the WWW Corp branches around the world. Users can zoom in and out, pan around the map, and click on a location to display details about a particular branch.

## Technologies

- Strapi (CMS and ORM)
- Google Maps JS SDK
- React
- TanStack Query (React Query)
- TailwindCSS
- Vite

## Usage

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Env Variables

Create a .env file in the backend directory and add the following:

```
HOST = 0.0.0.0
PORT = 1337
APP_KEYS = your app keys
API_TOKEN_SALT = your api token
ADMIN_JWT_SECRET = your admin jwt secret
TRANSFER_TOKEN_SALT = your transfer token salt
DATABASE_CLIENT = your database client
DATABASE_FILENAME = your database filename
JWT_SECRET = your jwt secret
DATABASE_URL = your database url
DATABASE_HOST = your database host
DATABASE_PORT = your database port
DATABASE_NAME = your database name
DATABASE_USERNAME = your database username
DATABASE_PASSWORD = your database password
DATABASE_SSL = your database ssl
AWS_ACCESS_KEY_ID= your aws key
AWS_ACCESS_SECRET = your aws secret
AWS_REGION = your aws region
AWS_BUCKET_NAME = your aws bucket name
```

Create a .env file in the frontend directory and add the following:

```
VITE_GOOGLE_MAPS_API_KEY = your google api key
VITE_BASE_URL = http://localhost:1337
NODE_ENV = development
```

### Install Dependencies (frontend & backend)

```
cd frontend
npm install
cd ../backend
npm install
```

### Run

Run backend (:1337)

```
cd backend
npm run develop
```

Run frontend (:5173)

```
cd frontend
npm run dev
```

## License

This project is open source and available under the MIT License.
