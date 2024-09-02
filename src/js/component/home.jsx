import React, { useEffect, useState } from "react";

// Create your first component
const Home = () => {
    const [tarea, setTarea] = useState("");
    const [misTareas, setMisTareas] = useState([]);

    const createUser = () => {
        fetch('https://playground.4geeks.com/todo/users/sabrinacorvetti00', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify ()})
          .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json(); 
          })
          .then(data => {
            console.log('Respuesta del servidor:', data); 
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error); 
          })
    }

    const createTarea = (tarea) => {
        fetch('https://playground.4geeks.com/todo/todos/sabrinacorvetti00', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify (
                {
                    label: tarea,
                    is_done: false
                  }
            )})
          .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            getTareas()
            return response.json(); 
          })
          .then(data => {
            console.log('Respuesta del servidor:', data); 
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error); 
          })
    }
    useEffect ( () => {
        createUser ()
        getTareas ()
    },[])
    const handleSubmit = (evento) => {
        evento.preventDefault();
        if (tarea.trim() !== "") {
            createTarea(tarea)
            setTarea("");
        }
    };

    const getTareas = () => {
        fetch('https://playground.4geeks.com/todo/users/sabrinacorvetti00')
          .then(response => {
            if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log('Datos recibidos:', data);
            setMisTareas(data.todos)
          })
          .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
          });
      }

      const deleteTarea = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE', // Método HTTP DELETE
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText); // Manejar errores si la respuesta no es exitosa
            }
            getTareas()
            return response.json(); // Convertir la respuesta a JSON (opcional, si el servidor responde con datos)
        })
        .then(data => {
            console.log('Respuesta del servidor:', data); // Manejar los datos recibidos (si los hay)
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error); // Manejar errores de la solicitud
        });
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
                        {posicion.label}
                        <span
                            className="delete-button"
                            onClick={() => deleteTarea(posicion.id)}
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

