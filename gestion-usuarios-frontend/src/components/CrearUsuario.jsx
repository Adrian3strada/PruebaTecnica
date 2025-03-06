import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CrearUsuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        correo_electronico: "",
        password: "",  // Cambiado de 'contraseña' a 'password'
        telefono: "",
    });

    const [error, setError] = useState(""); // Manejo de errores
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        try {
            // Enviar los datos del usuario sin el campo 'id'
            const { id, ...usuarioSinId } = usuario;

            const response = await axios.post("http://localhost:8000/api/usuarios/", usuarioSinId, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                // Redirigir al listado de usuarios tras crear
                navigate("/");  // O usa la ruta correcta para el listado
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            console.log("Detalles del error:", error.response?.data); // Ver detalles del error
            setError(error.response?.data?.detail || "Error desconocido");
        }
    };

    return (
        <div className="container">
            <h2>Crear Usuario</h2>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Muestra errores si los hay */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={usuario.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="correo_electronico">Correo Electrónico</label>
                    <input
                        type="email"
                        id="correo_electronico"
                        name="correo_electronico"
                        className="form-control"
                        value={usuario.correo_electronico}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"  // Cambiado de 'contraseña' a 'password'
                        className="form-control"
                        value={usuario.password}  // Cambiado de 'contraseña' a 'password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="form-control"
                        value={usuario.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CrearUsuario;
