import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, } from "flowbite-react";
import logotelesecundaria763 from '../images/logotelesecundaria763.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavDocentes() {
    const navigate = useNavigate();

    const [datosUsuario, setDatosUsuario] = useState(null);
    const idUsuario = localStorage.getItem('idUsuario');

    const handleOptionClick = (path) => {
        navigate(path);
        setShowOptions(false);
    };

    useEffect(() => {
        const data = {
            idUsuario: idUsuario
        };

        const url = 'http://localhost/TeleSecundaria763/datosUsuario.php';   // https://telesecundaria763.host8b.me/Web_Services/TeleSecundaria763/datosUsuario.php

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        console.log('Realizando fetch con los siguientes datos:', data);
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const usuario = {
                        nombre: data.vch_nombre,
                        APAterno: data.vch_APaterno,
                        AMAterno: data.vch_AMaterno,
                        correo: data.vch_correo
                    };
                    setDatosUsuario(usuario);
                    console.log('ya se metio aqui', usuario)
                } else {
                    console.log('Error: ', data.error);
                }
            })
            .catch(error => {
                console.log('Error al hacer la petición de datos:', error);
            });
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar fluid rounded style={{ backgroundColor: '#FAFAFA'}} className="p-3 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 header">
                
                <NavbarBrand>
                    <Link to="/HomeDocentes" className="flex items-center">
                        <img src={logotelesecundaria763} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Telesecundaria 763</span>
                    </Link>
                </NavbarBrand>
    
                <div className="flex md:order-2">
                    <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}>
                        {datosUsuario && (
                            <DropdownHeader>
                                <span className="block text-sm">{datosUsuario.nombre} {datosUsuario.APaterno} {datosUsuario.AMaterno}</span>
                                <span className="block truncate text-sm font-medium">{datosUsuario.correo}</span>
                            </DropdownHeader>
                        )}
                        
                        <DropdownItem onClick={() => handleOptionClick('/PerfilDocente')}>Perfil</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                    <NavbarToggle />
                </div>

                <NavbarCollapse>
                    <NavbarLink href="#" active >Home</NavbarLink>
                    <NavbarLink href="#">Inicio</NavbarLink>
                    <NavbarLink href="#">Docentes</NavbarLink>
                    <NavbarLink href="#">Alumnos</NavbarLink>
                    <NavbarLink href="#">Contactos</NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    );    
}

export default NavDocentes