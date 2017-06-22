import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <main className="start-page">
                <h1 className="u-text-center">
                    <span>Welcome to</span>
                    <span className="u-violet u-bold"> FAKTURKI!</span>
                    <span className="u-text-xs u-top"> ©</span>
                </h1>
            </main>
        );
    }

    componentDidMount() {
        console.log('Home page...');
    }
}