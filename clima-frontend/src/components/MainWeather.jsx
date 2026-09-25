import { useEffect, useState } from "react";
import { getLatestData } from "../services/api";
import { motion } from "framer-motion";
import { 
    WiThermometer, 
    WiHumidity, 
    WiBarometer,
    WiDaySunny,
    WiCloud,
    WiRain,
    WiSnow,
    WiNightClear,
    WiNightAltCloudy
} from "react-icons/wi";

function MainWeather({ station }) {

    const [data, setData] = useState(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        loadData();

        const interval = setInterval(loadData, 600000);

        const clock = setInterval(() => {
            const now = new Date();
            setTime(now);

            const hour = now.getHours();

            // 🔥 LIMPIAR CLASES
            document.body.classList.remove(
                "day-mode",
                "afternoon-mode",
                "night-mode"
            );

            // 🌅 APLICAR SEGÚN HORA
            if (hour >= 19 || hour < 6) {
                document.body.classList.add("night-mode");
            } else if (hour >= 12) {
                document.body.classList.add("afternoon-mode");
            } else {
                document.body.classList.add("day-mode");
            }

        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(clock);
        };
    }, [station]);

    const loadData = async () => {
        const res = await getLatestData(station.id);
        setData(res.data[0]);
    };

    if (!data) return <p>Cargando...</p>;

    // 🌅 MOMENTO DEL DÍA
    const getTimeOfDay = () => {
        const hour = time.getHours();

        if (hour >= 19 || hour < 6) return "noche";
        if (hour >= 12) return "tarde";
        return "dia";
    };

    const period = getTimeOfDay();

    // 🌤️ CLIMA BASE
    const getWeatherCondition = () => {
        const temp = parseFloat(data.temperatura);
        const hum = parseFloat(data.humedad);

        if (hum > 80) return "lluvia";
        if (temp >= 30) return "calor";
        if (temp >= 20) return "soleado";
        if (temp >= 10) return "templado";
        return "frio";
    };

    // 🌙 ICONOS DINÁMICOS
    const getWeatherIcon = () => {
        const condition = getWeatherCondition();

        // 🌙 NOCHE
        if (period === "noche") {
            if (condition === "lluvia") return <WiNightAltCloudy size={90} />;
            return <WiNightClear size={90} />;
        }

        // 🌇 TARDE
        if (period === "tarde") {
            return <WiDaySunny size={90} />;
        }

        // 🌤 DÍA
        switch (condition) {
            case "calor":
            case "soleado":
                return <WiDaySunny size={90} />;
            case "templado":
                return <WiCloud size={90} />;
            case "lluvia":
                return <WiRain size={90} />;
            case "frio":
                return <WiSnow size={90} />;
            default:
                return <WiThermometer size={90} />;
        }
    };

    // 📝 TEXTO
    const getWeatherText = () => {
    const condition = getWeatherCondition();

    switch (condition) {
        case "calor":
            return "Caluroso";
        case "soleado":
            return "Despejado";
        case "templado":
            return "Parcialmente nublado";
        case "lluvia":
            return "Lluvioso";
        case "frio":
            return "Frío";
        default:
            return "Clima";
    }
};

    return (
        <motion.div
            className="main-weather"
            key={station.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            {/* 🕒 RELOJ */}
            <div className="clock">
                {time.toLocaleTimeString("es-CO")}
            </div>

            {/* 🌤 ICONO */}
            {getWeatherIcon()}

            {/* 📝 TEXTO */}
            <p className="weather-text">{getWeatherText()}</p>

            {/* 🌡️ TEMPERATURA */}
            <h1>{parseFloat(data.temperatura).toFixed(1)}°</h1>

            {/* 📍 ESTACIÓN */}
            <p className="station-name">{station.nombre}</p>

            {/* 📅 FECHA */}
            <p className="date">
                {new Date(data.timestamp).toLocaleDateString("es-CO", {
                    weekday: "long",
                    day: "numeric",
                    month: "short"
                })}
            </p>

            {/* 📊 DETALLES */}
            <div className="details">
                <span>
                    <WiHumidity size={25} />
                    {parseFloat(data.humedad).toFixed(1)}%
                </span>

                <span>
                    <WiBarometer size={25} />
                    {parseFloat(data.presion_media).toFixed(1)} hPa
                </span>
            </div>

        </motion.div>
    );
}

export default MainWeather;