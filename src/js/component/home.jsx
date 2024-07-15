import React, { useState } from "react";

// Create your first component
const Home = () => {
    const [tarea, setTarea] = useState("");
    const [misTareas, setMisTareas] = useState([]);

    const handleSubmit = (evento) => {
        evento.preventDefault();
        if (tarea.trim() !== "") {
            setMisTareas([...misTareas, tarea]);
            setTarea("");
        }
    };

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">ToDo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={tarea}
                    onChange={(evento) => setTarea(evento.target.value)}
                    placeholder="Añadir nueva tarea"
                />
            </form>
            <ul>
                {misTareas.map((posicion, index) => (
                    <li key={index} className="task-item">
                        {posicion}
                        <span
                            className="delete-button"
                            onClick={() => setMisTareas(misTareas.filter((item, i) => i !== index))}
                        >
                            &#x2716;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
