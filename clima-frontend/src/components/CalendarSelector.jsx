import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getDays } from "../services/api";

function CalendarSelector({ station, onSelectDay }) {

    const [availableDays, setAvailableDays] = useState([]);
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        if (station) loadDays();
    }, [station]);

    const loadDays = async () => {
        try {
            const res = await getDays(station.id);

            // 🔥 convertir fechas correctamente
            const days = res.data.map(d => {
                const date = new Date(d.fecha);
                return date.toISOString().split("T")[0];
            });

            setAvailableDays(days);
        } catch (error) {
            console.error("Error cargando días:", error);
        }
    };

    const handleChange = (date) => {
        setValue(date);

        const formatted = date.toISOString().split("T")[0];
        onSelectDay(formatted);
    };

    return (
        <div className="calendar-box">

            <h3>📅 Historial</h3>

            <Calendar
                onChange={handleChange}
                value={value}
                tileClassName={({ date }) => {
                    try {
                        const d = date.toISOString().split("T")[0];
                        return availableDays.includes(d) ? "active-day" : null;
                    } catch {
                        return null;
                    }
                }}
            />

        </div>
    );
}

export default CalendarSelector;