import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { motion } from "framer-motion";
import { 
    WiDaySunny,
    WiCloud,
    WiRain,
    WiSnow
} from "react-icons/wi";

function ForecastHourly({ station }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadHistory();
    }, [station]);

    const loadHistory = async () => {
        const res = await getHistory(station.id, "hora");
        setData(res.data);
    };

    // 🌤️ DETECTAR CLIMA POR CADA HORA
    const getWeatherCondition = (item) => {
        const temp = parseFloat(item.temperatura);
        const hum = parseFloat(item.humedad);

        if (hum > 80) return "lluvia";
        if (temp >= 30) return "calor";
        if (temp >= 20) return "soleado";
        if (temp >= 10) return "templado";
        return "frio";
    };

    // ☁️ ICONO POR HORA
    const getWeatherIcon = (item) => {
        const condition = getWeatherCondition(item);

        switch (condition) {
            case "calor":
            case "soleado":
                return <WiDaySunny size={28} />;
            case "templado":
                return <WiCloud size={28} />;
            case "lluvia":
                return <WiRain size={28} />;
            case "frio":
                return <WiSnow size={28} />;
            default:
                return <WiCloud size={28} />;
        }
    };

    // 📊 PROMEDIOS
    const calcularPromedios = () => {
        if (!data.length) return null;

        const totalTemp = data.reduce((acc, d) => acc + parseFloat(d.temperatura), 0);
        const totalHum = data.reduce((acc, d) => acc + parseFloat(d.humedad), 0);
        const totalPres = data.reduce((acc, d) => acc + parseFloat(d.presion), 0);

        return {
            temp: (totalTemp / data.length).toFixed(1),
            hum: (totalHum / data.length).toFixed(1),
            pres: (totalPres / data.length).toFixed(1)
        };
    };

    const promedios = calcularPromedios();

    return (
        <>
            <div className="hourly">

                {data.map((item, i) => (
                    <motion.div
                        key={i}
                        className="hour-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >

                        <p className="hour">{item.tiempo}</p>

                        {/* 🔥 ICONO DINÁMICO */}
                        {getWeatherIcon(item)}

                        <p className="label">Temp</p>

                        <p className="value">
                            {parseFloat(item.temperatura).toFixed(1)}°
                        </p>

                    </motion.div>
                ))}

            </div>

            {promedios && (
                <div className="daily-averages">

                    <div className="avg-card">
                        <p>🌡 Temp Promedio</p>
                        <h3>{promedios.temp}°C</h3>
                    </div>

                    <div className="avg-card">
                        <p>💧 Humedad Promedio</p>
                        <h3>{promedios.hum}%</h3>
                    </div>

                    <div className="avg-card">
                        <p>📊 Presión Promedio</p>
                        <h3>{promedios.pres} hPa</h3>
                    </div>

                </div>
            )}
        </>
    );
}

export default ForecastHourly;