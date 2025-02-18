
import './App.css';
import Approutes from './Routes/Approutes';





// import Dashboard from './Pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <SignUp/> */}
      <BrowserRouter>

        <Approutes/>
      </BrowserRouter>

    </div>
  );
}

export default App;
