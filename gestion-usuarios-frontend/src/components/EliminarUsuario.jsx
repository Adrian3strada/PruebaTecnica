import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListadoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener la lista de usuarios desde el backend
        axios
            .get("http://localhost:8000/api/usuarios/")
            .then((response) => setUsuarios(response.data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const handleDelete = (id) => {
        // Confirmar eliminación
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
        if (confirmDelete) {
            axios
                .delete(`http://localhost:8000/api/usuarios/${id}/`)
                .then((response) => {
                    console.log(`Usuario ${id} eliminado`);
                    setUsuarios(usuarios.filter((usuario) => usuario.id !== id)); // Eliminar el usuario del estado
                })
                .catch((error) => console.error("Error al eliminar el usuario:", error));
        } else {
            console.log("Eliminación cancelada");
        }
    };

    return (
        <div className="container">
            {/* Banner de imagen */}
            <div className="banner">
                <img src="assets/img.png" alt="Banner" className="banner-image" />
            </div>

            <h2>Listado de Usuarios</h2>
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
        </div>
    );
};

export default ListadoUsuarios;
