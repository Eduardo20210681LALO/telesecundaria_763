import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Crud() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ name: '', gmail: '', mobile: '' });
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState('');
    const [editGmail, setEditGmail] = useState('');
    const [editMobile, setEditMobile] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost/TeleSecundaria763/CreateUsers.php', inputs)
            .then(function(response){
                console.log(response.data);
                getUsers();
                setInputs({ name: '', gmail: '', mobile: '' });
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/TeleSecundaria763/ListUsers.php')
            .then(function(response) {
                setUsers(response.data);
            });
    }

    const deleteUser = (id) => {
        const data = { id: id };
        
        console.log(data)
        fetch('http://localhost/TeleSecundaria763/EliminarUsuarioPrueba.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log('Usuario eliminado');
            getUsers();
        })
        .catch(error => {
            console.error('Error al eliminar el usuario:', error);
        });
    };

    const openEditModal = (userId) => {
        console.log("Modal de edición abierto para el usuario con ID:", userId);
        setIsEditModalOpen(true);
        setEditUserId(userId);
        getUser(userId);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const getUser = (userId) => {
        axios.post(`http://localhost/TeleSecundaria763/TraerDatosDelUsuarioaActualizar.php`, { id: userId })
            .then(function(response) {
                const userData = response.data.user[0];
                setEditName(userData.name);
                setEditGmail(userData.gmail);
                setEditMobile(userData.mobile);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del usuario:', error);
            });
    };

    const handleEditSubmit1 = (event) => {
        event.preventDefault();
        const data = {
            id: editUserId,
            name: editName,
            gmail: editGmail,
            mobile: editMobile
        };
        fetch('http://localhost/TeleSecundaria763/UpdateUserPrueba.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log('Se actualizó los datos');
            closeEditModal();
            getUsers();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
        });
    };

    console.log("Estado de isEditModalOpen:", isEditModalOpen);

    return (
        <div>
            <div>Crear Usuario</div>
            <form onSubmit={handleSubmit}>
                <table cellSpacing='10'>
                    <tbody>
                        <tr>
                            <th><label>Name:</label></th>
                            <td><input type='text' name='name' value={inputs.name} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <th><label>Gmail:</label></th>
                            <td><input type='text' name='gmail' value={inputs.gmail} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <th><label>Mobile:</label></th>
                            <td><input type='text' name='mobile' value={inputs.mobile} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='right'><button>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <div>Listar Usuario</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                       <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.gmail}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <button onClick={() => openEditModal(user.id)}>Editar</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                       </tr>
                    )}
                </tbody>
            </table>

            {isEditModalOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuario</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeEditModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit1}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="editName">Nombre:</label>
                                        <input value={editName} type="text" className="form-control" id="editName" onChange={(e) => setEditName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editGmail">Correo electrónico:</label>
                                        <input value={editGmail} type="email" className="form-control" id="editGmail" onChange={(e) => setEditGmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editMobile">Teléfono:</label>
                                        <input value={editMobile} type="text" className="form-control" id="editMobile" onChange={(e) => setEditMobile(e.target.value)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeEditModal}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Crud;
