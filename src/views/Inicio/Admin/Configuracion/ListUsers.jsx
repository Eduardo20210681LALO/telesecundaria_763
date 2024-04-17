import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function ListUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/TeleSecundaria763/ListUsers.php').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        const data = {
            id: id
        };

        fetch('http://localhost/TeleSecundaria763/EliminarUsuarioPrueba.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
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
                // Llamar a getUsers() para actualizar la lista después de eliminar el usuario
                getUsers();
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
            }
        );
    };

    return (
        <div>
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
                                <Link to={`user/${user.id}/EditUser`} style={{marginRight:"10px"}}>Editar</Link>
                                <button onClick={()=> deleteUser(user.id)}>Delete</button>
                            </td>
                       </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}

export default ListUsers