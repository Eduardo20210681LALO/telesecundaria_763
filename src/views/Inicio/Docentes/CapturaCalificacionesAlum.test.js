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


import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalificaAlum from './CapturaCalificacionesAlum';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';


// Simula el módulo axios para que no haga peticiones reales
jest.mock('axios', () => ({
    post: jest.fn(),
}));



describe('CapturaCalificacionesAlum Component', () => {
    beforeEach(() => {
        localStorage.clear(); // Limpia el localStorage antes de cada prueba
    });

    test('Renderiza el módulo de captura de calificaciones de los alumnos', () => {
        // Renderiza el componente Login dentro de BrowserRouter
        render(
            <BrowserRouter>
            <CalificaAlum />
            </BrowserRouter>
        );

        // Puedes agregar más expectativas para verificar el contenido renderizado
        expect(screen.getByText(/Carga de Calificaciones de Alumnos/i)).toBeInTheDocument();

    });


    test('Verifica que la sección de datos del período se renderice correctamente', () => {
        render(
            <BrowserRouter>
                <CalificaAlum />
            </BrowserRouter>
        );

        expect(screen.getByText(/Datos del Período/i)).toBeInTheDocument();
        expect(screen.getByText(/Periodo:/i)).toBeInTheDocument();
        expect(screen.getByText(/Grado:/i)).toBeInTheDocument();
        expect(screen.getByText(/Grupo:/i)).toBeInTheDocument();
        expect(screen.getByText(/Trimestre:/i)).toBeInTheDocument();
    });

    test('Verifica que la tabla de alumnos y calificaciones se renderice correctamente', () => {
        render(
            <BrowserRouter>
                <CalificaAlum />
            </BrowserRouter>
        );

        expect(screen.getByText(/Lista de Alumnos y Calificaciones/i)).toBeInTheDocument();
        expect(screen.getByRole('table')).toBeInTheDocument();
    });


    test('Verifica que se muestre un mensaje de error al intentar guardar sin datos', async () => {
        const errorSpy = jest.spyOn(message, 'error');
        
        render(
            <BrowserRouter>
                <CalificaAlum />
            </BrowserRouter>
        );

        // Simular el clic en el botón de guardar
        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: /Guardar en la Base de Datos/i }));
        });

        expect(errorSpy).toHaveBeenCalledWith('No hay datos válidos para guardar.');
    });


});