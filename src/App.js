import React from 'react';
import Container from './components/container-component/container.component';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { myConfig } from './components/container-component/component-map';
import { authService } from './components/container-component/modules/authService'

function App() {

  if(!authService.currentUserValue){
    return (
      <Router>
          <div className="App">
            <Container role='' links={myConfig}/>
          </div>
      </Router>
    );
  }
  else{
    return (
      <Router>
          <div className="App">
            <Container role={authService.currentUserValue.token.role} links={myConfig}/>
          </div>
      </Router>
    );
  }
}

export default App;
