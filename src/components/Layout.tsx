import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';

export class Layout extends Component {
    render() {
        const { children } = this.props
        return (
            <div className='layout'>
                <Header />
                {children}
                <Footer />
            </div>
        );
    }
}