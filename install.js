const mysql = require('mysql2');

// Anslut till MySQL (utan databas)
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'Moment2',
    user: 'root',
    password: ''
});

connection.connect((err) => {
    if (err) {
        console.error("Kan inte ansluta:", err);
        return;
    }

    console.log("Ansluten till MySQL!");
    
    // Skapa databasen
    connection.query("CREATE DATABASE IF NOT EXISTS Moment2", (err) => {
        if (err) {
            console.error("Kunde inte skapa databas:", err);
            return;
        }
        console.log("Databas 'Moment2' skapad!");
        
        // Byt till cv-databasen
        connection.changeUser({database: 'cv'}, (err) => {
            if (err) {
                console.error("Kunde inte byta till cv:", err);
                return;
            }
            
            // Skapa tabellen
            const skapaTabell = `
                CREATE TABLE IF NOT EXISTS employees (
                    ID INT PRIMARY KEY AUTO_INCREMENT,
                    Name VARCHAR(10) NOT NULL,
                    Lastname VARCHAR(100) NOT NULL,
                    Jobtitle VARCHAR(100) NOT NULL,
                    Location VARCHAR(100) NOT NULL,
                    Dateofbirth DATE NOT NULL,
                    Startdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            connection.query(skapaTabell, (err) => {
                if (err) {
                    console.error("Kunde inte skapa tabell:", err);
                    return;
                }
                console.log("Tabell 'employees' skapad!");
                console.log("Allt klart! Starta servern med: node server.js");
                connection.end();
            });
        });
    });
});