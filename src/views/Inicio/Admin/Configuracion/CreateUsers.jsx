import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUsers() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        console.log(inputs)
        event.preventDefault();

        axios.post('http://localhost/TeleSecundaria763/CreateUsers.php', inputs).then(function(response){
            console.log(response.data);
        });
    }

    return (
        <div>
            <div>Crear Usuario</div>
            <form onSubmit={handleSubmit}>

                <table cellSpacing='10'>
                    <tbody>
                        <tr>
                            <th>
                            <label>Name:</label>
                            </th>

                            <td>
                            <input type='text' name='name' onChange={handleChange}></input>
                            </td>
                        </tr>

                        <tr>
                            <th>
                            <label>gmail:</label>
                            </th>

                            <td>
                            <input type='text' name='gmail' onChange={handleChange}></input>
                            </td>
                        </tr>

                        <tr>
                            <th>
                            <label>mobile:</label>
                            </th>

                            <td>
                            <input type='text' name='mobile' onChange={handleChange}></input>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' align='right'>
                            <button>Save</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </form>
            
        </div>
    )
}

export default CreateUsers