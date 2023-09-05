import './App.css';
import Patient from './components/Patient/Patient';
import Admin from './components/Admin/Admin';
import Cmn from './components/Cmn/Cmn';
import Doctor from './components/Doctor/Doctor';
import Patientpage from './components/Patient/Patientpage';
import Doctorpage from './components/Doctor/Doctorpage';
import Adminpage from './components/Admin/Adminpage';
import Patientdetails from './components/Admin/Patientdetails';
import Pdbydate from './components/Admin/Pdbydate';
import Pdbydr from './components/Admin/Pdbydr';
import Doctordetails from './components/Admin/Doctordetails';
import Test from './components/testing/Test';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='' element={<Cmn/>}/>
      <Route path='p' element={<Patient/>}/>
      <Route path='d' element={<Doctor/>}/>
      <Route path='a' element={<Admin/>}/>
      <Route path='pp' element={<Patientpage/>}/>
      <Route path='pd' element={<Patientdetails/>}/>
      <Route path='pdd' element={<Pdbydate/>}/>
      <Route path='pddd' element={<Pdbydr/>}/>
      <Route path='dd' element={<Doctordetails/>}/>
      <Route path='dp' element={<Doctorpage/>}/>
      <Route path='ap' element={<Adminpage/>}/>
      <Route path='test' element={<Test/>}/>
      </Routes>  
      </BrowserRouter>
    </>
  );
}

export default App;
{/* <Patient/>
<Doctor/>
<Cmn/>
<Admin/> */}