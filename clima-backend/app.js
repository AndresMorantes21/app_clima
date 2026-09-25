require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Rutas
const stationRoutes = require("./routes/stationRoutes");

app.use("/api", stationRoutes);

// 🔥 Puerto
const PORT = process.env.PORT || 5000;

// 🔥 IMPORTANTE PARA DOCKER
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});