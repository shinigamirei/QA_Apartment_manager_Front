import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApartmentLanding from './components/apartment_manager_landing.component';
import SearchContainer from './components/search-bar/searchContainer.component';


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
