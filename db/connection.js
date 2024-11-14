const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Adjust the connection limit according to your needs
    queueLimit: 0
});

async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

// async function connectToDatabase() {
//     try {
//         const connection = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             database: process.env.DB_NAME,
//         });
//         console.log('Connected to MySQL database');
//         return connection;
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         throw error;
//     }
// }

// const connectToDatabase = () => {
//     return new Promise((resolve, reject) => {
//         const connection = mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             database: process.env.DB_NAME,
//         });
//
//         connection.connect((error) => {
//             if (error) {
//                 console.log("Error connecting to database:", error);
//                 reject(error);
//             } else {
//                 console.log("DB Connected");
//                 resolve(connection);
//             }
//         });
//     });
// };

module.exports = connectToDatabase;

