//Anslutning till databasen
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DT207G_Moment2'
});

const promiseConnection = connection.promise();



promiseConnection.connect((err) => {
    if (err) {
        console.error('Kunde inte ansluta till databasen:', err.message);
        return;
    }
    console.log('Ansluten till databasen cv');
});

module.exports = promiseConnection;