const mysql = require("mysql2");

let pool;

function connectWithRetry() {

    pool = mysql.createPool({
        host: process.env.DB_HOST || "mysql",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "base_sensoresv2",
        port: process.env.DB_PORT || 3306,

        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    pool.getConnection((err, connection) => {

        if (err) {

            console.error(
                "❌ Error conectando a MySQL. Reintentando en 5 segundos..."
            );

            setTimeout(connectWithRetry, 5000);

        } else {

            console.log("✅ Conectado a MySQL con éxito");

            connection.release();
        }

    });

}

connectWithRetry();

module.exports = () => pool;