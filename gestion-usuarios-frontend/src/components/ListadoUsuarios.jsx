import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImage from '../assets/img.png'; // Ajusta la ruta según la ubicación real

const ListadoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/usuarios/")
            .then((response) => {
                setUsuarios(response.data);
                setCargando(false);
            })
            .catch((error) => {
                setError("Error al cargar los usuarios.");
                setCargando(false);
            });
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/usuarios/${id}/`);
                setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
            } catch (error) {
                alert("Error al eliminar el usuario.");
            }
        }
    };

    return (
        <div className="container">
            {/* Imagen banner */}
            <div className="banner">
                <img src={bannerImage} alt="Banner" className="banner-image" />
            </div>

            <h2>Listado de Usuarios</h2>

            {cargando && <p>Cargando usuarios...</p>}
            {error && <p className="error-message">{error}</p>}

            {!cargando && !error && (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.correo_electronico}</td>
                                    <td>{usuario.telefono}</td>
                                    <td>
                                        <button
                                            className="btn btn-edit"
                                            onClick={() => navigate(`/editar-usuario/${usuario.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-delete ml-2"
                                            onClick={() => handleDelete(usuario.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-create" onClick={() => navigate("/crear-usuario")}>
                        Crear Usuario
                    </button>
                </>
            )}
        </div>
    );
};

export default ListadoUsuarios;
