import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CapturaCalificacionesAlum from './CapturaCalificacionesAlum';
import { message } from 'antd';

jest.mock('antd', () => ({
  message: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

describe('CapturaCalificacionesAlum Integration Test', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('should send data to the API and display success message on successful submission', async () => {
    // Simulación de la respuesta esperada de la API
    mock.onPost('http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesSegundo.php').reply(200, {
      success: true,
    });
    
    mock.onPost('http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesFinales.php').reply(200, {
      success: true,
    });

    const { getByText, getByLabelText } = render(<CapturaCalificacionesAlum />);

    // Simulación de la carga del archivo
    const fileInput = getByLabelText('Cargar Archivo Excel');
    const file = new File([new ArrayBuffer(1)], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Espera a que se procese el archivo
    await waitFor(() => expect(fileInput.files[0]).toBe(file));

    // Hacer clic en el botón "Guardar en la Base de Datos"
    fireEvent.click(getByText('Guardar en la Base de Datos'));

    // Espera a que la solicitud se haya enviado y se muestre el mensaje de éxito
    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith('Datos guardados en la base de datos correctamente.');
      expect(message.success).toHaveBeenCalledWith('Promedio general guardado correctamente.');
    });
  });

  test('should display error message if there is an error saving data', async () => {
    // Simulación de error en la API
    mock.onPost('http://localhost/TeleSecundaria763/Docentes/InsertarCalificacionesSegundo.php').reply(500);
    
    const { getByText, getByLabelText } = render(<CapturaCalificacionesAlum />);

    // Simulación de la carga del archivo
    const fileInput = getByLabelText('Cargar Archivo Excel');
    const file = new File([new ArrayBuffer(1)], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Espera a que se procese el archivo
    await waitFor(() => expect(fileInput.files[0]).toBe(file));

    // Hacer clic en el botón "Guardar en la Base de Datos"
    fireEvent.click(getByText('Guardar en la Base de Datos'));

    // Espera a que la solicitud se haya enviado y se muestre el mensaje de error
    await waitFor(() => {
      expect(message.warning).toHaveBeenCalledWith('Hubo un error al intentar guardar los datos en la base de datos.');
    });
  });
});
