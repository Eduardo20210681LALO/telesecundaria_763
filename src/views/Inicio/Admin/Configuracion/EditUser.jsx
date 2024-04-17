import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [gmail, setGmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.post(`http://localhost/TeleSecundaria763/TraerDatosDelUsuarioaActualizar.php`, { id:id })
            .then(function(response) {
                const userData = response.data.user[0];
                setName(userData.name);
                setGmail(userData.gmail);
                setMobile(userData.mobile);
                
                setIsLoading(false);
            })
            .catch(function(error) {
                console.error('Error al obtener los datos del usuario:', error);
                setIsLoading(false);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            id: id,
            name: name,
            gmail: gmail,
            mobile: mobile
        };

        fetch('http://localhost/TeleSecundaria763/UpdateUserPrueba.php', {
            method: 'PUT',
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
                console.log('Se actualizó los datos');
                navigate('/ListUsers');
            })
            .catch(error => {
                console.error('Error al actualizar el usuario:', error);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <div>Editar Usuario</div>
            <form onSubmit={handleSubmit}>
                <table cellSpacing='10'>
                    <tbody>
                        <tr>
                            <th><label>Name:</label></th>
                            <td><input value={name} type='text' onChange={(e) => setName(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <th><label>Gmail:</label></th>
                            <td><input value={gmail} type='text' onChange={(e) => setGmail(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <th><label>Mobile:</label></th>
                            <td><input value={mobile} type='text' onChange={(e) => setMobile(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='right'><button>Save</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default EditUser