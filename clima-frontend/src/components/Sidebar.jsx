function Sidebar({ stations, onSelect, selected }) {
    return (
        <aside className="sidebar">
            <h2>🌍 Estaciones</h2>

            <ul>
                {stations.map(st => (
                    <li 
                        key={st.id}
                        className={selected?.id === st.id ? "active" : ""}
                        onClick={() => onSelect(st)}
                    >
                        {st.nombre}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;