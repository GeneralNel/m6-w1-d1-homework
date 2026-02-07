import React, { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link, useParams, useNavigate } from 'react-router-dom';

function InventoryEdit() {
    const emptyInventory = {
        prodname: '',
        qty: '',
        price: '',
        status: ''
    };

    const [inventory, setInventory] = useState(emptyInventory);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            if (id !== 'new') {
                const response = await fetch(`/api/inventory/${id}`);
                const data = await response.json();
                setInventory(data);
            }
            setIsLoading(false);
        };
        fetchInventory();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInventory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        await fetch('/api/inventory', {
            method: inventory._id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventory),
        });
        setIsLoading(false);
        navigate('/inventories');
    };

    const title = <h2 className="mt-3">
        {inventory._id ? 'Edit Inventory' : 'Add Inventory'}</h2>;

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="prodname">Product Name</Label>
                        <Input type="text" name="prodname" id="prodname" value={inventory.prodname || ''} onChange={handleChange} autoComplete="prodname-name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <Input type="number" name="qty" id="qty" value={inventory.qty || ''} onChange={handleChange} autoComplete="qty-name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="number" name="price" id="price" value={inventory.price || ''} onChange={handleChange} autoComplete="price-name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input type="select" name="status" id="status" value={inventory.status || ''} onChange={handleChange} autoComplete="status-name">
                            <option value="">Select Status</option>
                            <option value="S">S</option>
                            <option value="R">R</option>
                            <option value="T">T</option>
                        </Input>
                    </FormGroup>
                    <Button color="success" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>{' '}
                    <Button color="secondary" tag={Link} to="/inventories">Cancel</Button>
                </Form>
            </Container>
        </div>
    );
}

export default InventoryEdit;