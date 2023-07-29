import './App.css';
import './index.css'
import Login from './pages/Login';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavComponent from './layout/Navbar';
import Cliente from './users/Clientes';
import AddCliente from './users/AddCliente';
import EditCliente from './users/EditCliente';
import Agentes from './agentes/Agentes';
import AddAgente from './agentes/AddAgente';
import EditAgente from './agentes/EditAgente';
import Destinos from './destinos/Destinos';
import AddDestinos from './destinos/AddDestino';
import EditDestinos from './destinos/EditDestinos';
import Reservas from './reservas/Reservas';


function App() {
  return (
    <div className="App">


<Router>
    
        <Routes>
          <Route excat path='/login' element={<Login/>}/>
          <Route excat path='/home' element={<Home/>}/>
          <Route excat path='/navbar' element={<NavComponent/>}/>
          <Route excat path='/clientes' element={<Cliente/>}/>
          <Route excat path='/agentes' element={<Agentes/>}/>
          <Route excat path='/newclient' element={<AddCliente/>}/>
          <Route excat path='/addagente' element={<AddAgente/>}/>
          <Route excat path='/editagente/:id' element={<EditAgente/>}/>
          <Route excat path='/editclient/:id' element={<EditCliente/>}/>
          <Route excat path='/destinos' element={<Destinos/>}/>
          <Route excat path='/newdestino' element={<AddDestinos/>}/>
          <Route excat path='/editdestino/:id' element={<EditDestinos/>}/>
          <Route excat path='/reservas' element={<Reservas/>}/>

          {/* <Route excat path='/edituser/:id' element= {<EditUser/>}/>
          <Route exact path="/viewuser/:id" element={<ViewUser />} /> */}
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
