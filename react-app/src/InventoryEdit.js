import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import AppNavbar from './Navbar';
import { Link } from 'react-router-dom';

class InventoryEdit extends Component {
    emptyInventory = {
        prodname: '',
        qty: '',
        price: '',
        status: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            inventory: this.emptyInventory,
            isLoading: true
        };
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const response = await fetch(`/api/inventory/${this.props.match.params.id}`);
            const data = await response.json();
            this.setState({ inventory: data, isLoading: false });
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let inventory = { ...this.state.inventory };
        inventory[name] = value;
        this.setState({ inventory: inventory });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { inventory } = this.state;
        this.setState({ isLoading: true });

        await fetch('/api/inventory', {
            method: (inventory._id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inventory),
        });
        this.setState({ isLoading: false });
        this.props.navigate('/inventories');
    }

    render() {
        const { inventory, isLoading } = this.state;
        const title = <h2 className="mt-3">
            {inventory._id ? 'Edit Inventory' : 'Add Inventory'}</h2>;
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="prodname">Product Name</Label>
                            <Input type="text" name="prodname" id="prodname" value={inventory.prodname} onChange={this.handleChange} autoComplete="prodname-name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="qty">Quantity</Label>
                            <Input type="number" name="qty" id="qty" value={inventory.qty} onChange={this.handleChange} autoComplete="qty-name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="number" name="price" id="price" value={inventory.price} onChange={this.handleChange} autoComplete="price-name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="select" name="status" id="status" value={inventory.status} onChange={this.handleChange} autoComplete="status-name">
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </Input>
                        </FormGroup>
                        <Button color="success" type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                        <Button color="secondary" tag={Link} to="/inventories">Cancel</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default InventoryEdit;