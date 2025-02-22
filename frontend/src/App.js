
import './App.css';
  import Router from './components/router';
   import Json from './json';
   import ContextloginProvider from './components/contextlogin';
   
   
   

function App() {
  return (
      <div className='App'>
    <ContextloginProvider>
    <Router/> 
    </ContextloginProvider>
   
            
    
      </div>

    
  );
}

export default App;
