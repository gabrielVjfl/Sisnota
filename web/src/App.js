import logo from './logo.svg';
import './App.css';
import './styles/globalStyle'
import Routes from '../src/routes/routes'
import UserProvider from '../src/services/Action'
function App() {
  return (
  
    <div className="App">
        <UserProvider>
 
  <Routes/>
  </UserProvider>
    </div>
   
  );
}

export default App;
