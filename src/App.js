import React from 'react';

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
            <body>
                <SearchContainer data = {[{
                                'apartment_name':'X1',
                                'apartment_address':'',
                                'apartment_region':'Manchester'
                                },{
                                'apartment_name':'X2',
                                'apartment_address':'',
                                'apartment_region':'Brighton'
                                },{
                                'apartment_name':'X3',
                                'apartment_address':'',
                                'apartment_region':'Leeds'
                                }]} />
            </body>
        </div>
    );
}



export default App;
