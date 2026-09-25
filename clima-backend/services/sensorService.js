const getDB = require("../config/db");

class SensorService {

    static getStations() {
        return new Promise((resolve, reject) => {

            getDB().query(
                "SELECT id, nombre FROM estaciones",
                (err, results) => {

                    if (err) reject(err);
                    else resolve(results);

                }
            );

        });
    }

    static getStationById(id) {
        return new Promise((resolve, reject) => {

            getDB().query(
                "SELECT * FROM estaciones WHERE id = ?",
                [id],
                (err, results) => {

                    if (err) reject(err);
                    else resolve(results[0]);

                }
            );

        });
    }

    static getLatestData(id) {
        return new Promise((resolve, reject) => {

            const sql = `
                SELECT *
                FROM datos_estacion
                WHERE estacion_id = ?
                ORDER BY timestamp DESC
                LIMIT 10
            `;

            getDB().query(
                sql,
                [id],
                (err, results) => {

                    if (err) reject(err);
                    else resolve(results);

                }
            );

        });
    }

    static getHistory(id, type) {
        return new Promise((resolve, reject) => {

            const format =
                type === "hora"
                    ? "%H:00:00"
                    : "%H:%i:00";

            const sql = `
                SELECT 
                    DATE_FORMAT(timestamp, ?) as tiempo,
                    AVG(temperatura) as temperatura,
                    AVG(humedad) as humedad,
                    AVG(presion_media) as presion
                FROM datos_estacion
                WHERE estacion_id = ?
                GROUP BY tiempo
                ORDER BY tiempo ASC
            `;

            getDB().query(
                sql,
                [format, id],
                (err, results) => {

                    if (err) reject(err);
                    else resolve(results);

                }
            );

        });
    }

}

module.exports = SensorService;