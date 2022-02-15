import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AllEvents from './components/AllEvents';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import Register from './components/Register';
export const url = "http://localhost:4000"

function App() {
  return <>
   <h2 style={{"textAlign":"center"}}>Event Management</h2>

   <BrowserRouter>
        <Routes>
            <Route path='/create-event' element={<CreateEvent/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/event-details/:id' element={<EventDetails/>}/>
            <Route path='/' element={<AllEvents/>}/>
        </Routes>
   </BrowserRouter>
  </>
}

export default App;
