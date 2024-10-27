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
    import Usuarios from './Usuarios';
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

    test('Renderiza el de usuarios', () => {

        render(
            <BrowserRouter>
            <Usuarios />
            </BrowserRouter>
        );

    });


});