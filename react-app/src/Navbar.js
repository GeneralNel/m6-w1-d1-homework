import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AppNavbar extends Component {
    render() {
        return (
            <Navbar className="navbar-dark bg-dark navbar-expand-sm" expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            </Navbar>
        );
    }
}