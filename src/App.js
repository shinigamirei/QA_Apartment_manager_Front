import React from 'react';

import './App.css';
import ApartmentLanding from "./components/apartment_manager_landing.component";

function App() {
    return (
        
        <div className="App">
            <h1> this is the placeholder nav bar, </h1>
            
            <header className="App-header">
            <ApartmentLanding className="ApartmentLandingComponent">
            </ApartmentLanding>
            </header>
        </div>
    );
}

export default App;
