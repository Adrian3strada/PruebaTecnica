import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListadoUsuarios from './components/ListadoUsuarios';
import CrearUsuario from './components/CrearUsuario';
import EditarUsuario from './components/EditarUsuario';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Uso de 'element' para asignar el componente */}
          <Route path="/" element={<ListadoUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
