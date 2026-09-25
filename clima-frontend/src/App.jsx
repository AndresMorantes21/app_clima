import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MainWeather from "./components/MainWeather";
import ForecastHourly from "./components/ForecastHourly";
import ForecastDaily from "./components/ForecastDaily";
import { getStations } from "./services/api";
import "./index.css";




function App() {
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        loadStations();
    }, []);

    const loadStations = async () => {
        const res = await getStations();
        setStations(res.data);
        setSelectedStation(res.data[0]); // selecciona la primera por defecto
    };

    return (
        <div className="layout">

            <Sidebar
                stations={stations}
                onSelect={setSelectedStation}
                selected={selectedStation}
            />

            <main className="main">

                {selectedStation && (
                    <>
                        <MainWeather station={selectedStation} />
                        <ForecastHourly station={selectedStation} />
                    </>
                )}

               

            </main>

            {/* 🔥 ESTE ES EL PANEL DERECHO */}
            {selectedStation && (
                <ForecastDaily station={selectedStation} />
            )}

        </div>
    );
}

export default App;