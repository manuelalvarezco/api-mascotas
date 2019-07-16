// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// Vencimiento del token

process.env.EXPIRATION = '48h';

// Seed

process.env.SEED = process.env.SEED || 'secret';

// Bd

let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/pets';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;