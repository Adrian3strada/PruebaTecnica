import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditarUsuario = () => {
    const { id } = useParams(); // Obtiene el ID del usuario desde la URL
    const [usuario, setUsuario] = useState({
        nombre: '',
        correo_electronico: '',
        password: '',  // Cambiado 'contraseña' a 'password'
        telefono: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el usuario desde el backend usando el ID
        axios.get(`http://localhost:8000/api/usuarios/${id}/`)
            .then(response => {
                setUsuario(response.data);
            })
            .catch(error => {
                console.error('Error al obtener el usuario:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar si la contraseña fue modificada, si no, eliminarla de la solicitud
        const usuarioActualizado = { ...usuario };
        if (!usuarioActualizado.password) {  // Cambiado 'contraseña' a 'password'
            delete usuarioActualizado.password;  // No enviar la contraseña si no se cambió
        }

        // Enviar los datos al backend para actualizar el usuario
        axios.put(`http://localhost:8000/api/usuarios/${id}/`, usuarioActualizado)
            .then(response => {
                // Redirigir al listado de usuarios si la actualización es exitosa
                navigate('/');
            })
            .catch(error => {
                console.error('Error al actualizar el usuario:', error);
            });
    };

    return (
        <div className="container">
            <h2>Editar Usuario</h2>
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
                        name="password"
                        className="form-control"
                        value={usuario.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="form-control"
                        value={usuario.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Editar Usuario
                </button>
            </form>
        </div>
    );
};

export default EditarUsuario;
