// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Bd

let urlDB;

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/pets';
} else {
    urlDB = "mongodb+srv://manuel:MPWgkkpe2zIXtdgu@cluster0-ormcf.mongodb.net/pets"
}

process.env.URLDB = urlDB;