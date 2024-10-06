import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { message, Modal } from 'antd';

function Carrito() {
    const [cart, setCart] = useState([
        { id: 1, name: 'AirPods con Estuche de Carga (Lightning) de generación', price: 3599.00, quantity: 1 },
        { id: 2, name: 'Hi Me Hard And Soft [Black] - Billie Eilish', price: 9.00, quantity: 1 }
    ]);
    
    const removeItem = (itemId) => {
        // Mostrar mensaje de advertencia antes de eliminar
        Modal.confirm({
            title: '¿Estás seguro de que quieres eliminar este producto del carrito?',
            onOk: () => {
                setCart(cart.filter(item => item.id !== itemId));
            },
            okText: 'Sí',
            cancelText: 'Cancelar'
        });
    };

    const incrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const decrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item.id === itemId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Container>
            <h2 className="mt-4 mb-3">Carrito de compras</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => decrementQuantity(item.id)} className="mr-2">-</Button>
                                {item.quantity}
                                <Button variant="outline-primary" onClick={() => incrementQuantity(item.id)} className="ml-2">+</Button>
                            </td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <Button variant="danger" onClick={() => removeItem(item.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <h3>Resumen del pedido</h3>
                <div>Subtotal: ${calculateTotal().toFixed(2)}</div>
                <div>Envío: $0.00</div>
                <div>Total: ${calculateTotal().toFixed(2)}</div>
                <Button variant="primary" className="mt-3">PAGAR AHORA</Button>
            </div>
        </Container>
    );
};

export default Carrito;