const SensorService = require("../services/sensorService");

class StationController {

    static async getStations(req, res) {
        try {
            const data = await SensorService.getStations();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getStationById(req, res) {
        try {
            const data = await SensorService.getStationById(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getLatestData(req, res) {
        try {
            const data = await SensorService.getLatestData(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getHistory(req, res) {
        try {
            const { type } = req.query;
            const data = await SensorService.getHistory(req.params.id, type);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
}

module.exports = StationController;