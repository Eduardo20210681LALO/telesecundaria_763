import '@testing-library/jest-dom'; // Importa jest-dom
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { message } from 'antd';

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Limpia el localStorage antes de cada prueba
  });

  test('renderiza el formulario con campos de tipo de usuario, correo y contraseña', () => {
    // Renderiza el componente Login dentro de BrowserRouter
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Verifica que el botón "Iniciar Sesión" se renderiza
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de usuario/i)).toBeInTheDocument();

  });

  test('muestra mensaje de advertencia cuando se intenta enviar sin tipo de usuario', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(message.warning).toHaveBeenCalledWith('Por favor, seleccione un tipo de usuario.');
  });

    test('muestra la opción de recuperación de contraseña cuando se hace clic en "Recuperar"', () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
  
      fireEvent.click(screen.getByText(/recuperar/i));
      expect(screen.getByText(/selecciona el metodo/i)).toBeInTheDocument();
    });


});
