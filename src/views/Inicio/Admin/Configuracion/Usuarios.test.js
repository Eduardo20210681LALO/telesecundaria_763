import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Usuarios from './Usuarios';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';


// Simula window.matchMedia en Jest
beforeAll(() => {
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};
});


// Simula el módulo axios para que no haga peticiones reales
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));



describe('Usuarios Component', () => {

    beforeEach(() => {
        localStorage.clear(); // Limpia el localStorage antes de cada prueba
    });

    test('Renderiza el módulo de usuarios', async () => {
        render(
            <BrowserRouter>
                <Usuarios />
            </BrowserRouter>
        );

        // Aserciones para verificar que los elementos de la interfaz están presentes
        expect(screen.getByText(/Visualización Usuarios/i)).toBeInTheDocument();
        expect(screen.getByText(/Filtrar por tipo de usuario/i)).toBeInTheDocument();
    });


    test('Verifica que se rendericen los encabezados de la tabla', () => {
        render(
            <BrowserRouter>
                <Usuarios />
            </BrowserRouter>
        );

        expect(screen.getByText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByText(/Correo/i)).toBeInTheDocument();
        expect(screen.getByText(/Tipo de Usuario/i)).toBeInTheDocument();
    });


    test('Renderiza los componentes de la tabla de usuarios', () => {
        render(
            <BrowserRouter>
                <Usuarios />
            </BrowserRouter>
        );

        const tableElement = screen.getByRole('table');
        expect(tableElement).toBeInTheDocument();
    });

    test('Muestra la etiqueta de estado de usuario correctamente', async () => {
        // Mock de datos para usuario con estatus 'ACTIVO'
        axios.post.mockResolvedValue({
            data: [
                { id_usuario: 1, vch_usuario: 'admin', vch_correo: 'admin@example.com', vch_telefono: '123456789', id_rol: 1, id_estatus: 1, vch_nombre: 'Admin', vch_APaterno: 'User', vch_AMaterno: 'Test' },
            ],
        });

        render(
            <BrowserRouter>
                <Usuarios />
            </BrowserRouter>
        );

        // Verifica que la etiqueta de estado esté presente con el texto correcto
        await waitFor(() => expect(screen.getByText(/ACTIVO/i)).toBeInTheDocument());
    });


    test('Alterna la visibilidad de la barra lateral al hacer clic en el botón de menú', () => {
        render(
            <BrowserRouter>
            <Usuarios />
            </BrowserRouter>
        );

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);
        expect(localStorage.getItem('sidebarCollapsed')).toBe('true');

        fireEvent.click(toggleButton);
        expect(localStorage.getItem('sidebarCollapsed')).toBe('false');
    });


});