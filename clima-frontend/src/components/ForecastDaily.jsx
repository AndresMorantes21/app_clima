import { useEffect, useState } from "react";
import { getLatestData } from "../services/api";

function ForecastDaily({ station }) {

    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        if (station) generateForecast();
    }, [station]);

    const generateForecast = async () => {

        const res = await getLatestData(station.id);

        if (!res.data || res.data.length === 0) return;

        const data = res.data;

        // 🔥 calcular promedios actuales
        const avgTemp = data.reduce((a, b) => a + parseFloat(b.temperatura), 0) / data.length;
        const avgHum = data.reduce((a, b) => a + parseFloat(b.humedad), 0) / data.length;
        const avgPres = data.reduce((a, b) => a + parseFloat(b.presion_media), 0) / data.length;

        // 🔥 tendencia temperatura
        let diffs = [];
        for (let i = 1; i < data.length; i++) {
            diffs.push(
                parseFloat(data[i].temperatura) - parseFloat(data[i - 1].temperatura)
            );
        }

        const trend = diffs.length
            ? diffs.reduce((a, b) => a + b, 0) / diffs.length
            : 0;

        // 🔮 predicción día siguiente
        setForecast({
            temp: (avgTemp + trend * 5).toFixed(1),
            hum: avgHum.toFixed(1),
            pres: avgPres.toFixed(1)
        });
    };

    if (!forecast) {
        return (
            <aside className="right-panel">
                <h3>🔮 Pronóstico</h3>
                <p>Cargando...</p>
            </aside>
        );
    }

    return (
        <aside className="right-panel">

            <h3 id = "title-righ-panel">Mañana</h3>

            <div className="avg-card">
                <p>🌡 Temperatura</p>
                <h3>{forecast.temp}°C</h3>
            </div>

            <div className="avg-card">
                <p>💧 Humedad</p>
                <h3>{forecast.hum}%</h3>
            </div>

            <div className="avg-card">
                <p>📊 Presión</p>
                <h3>{forecast.pres} hPa</h3>
            </div>

        </aside>
    );
}

export default ForecastDaily;