import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Pdbydr(){
    const navigate = useNavigate();
    const [patientList, setpatientList] = useState([]); // for showing (mapping) Patient list for mentioned doctor
    const [doctorList, setdoctorList] = useState([]);   // for showing doctor list in input Select option
    const [inputdoctor, setInputdoctor] = useState({    // for storing doctor name in this state to request API
        doctor:"",
        date:""
    });

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const onChangeHandlerDr = (event)=>{
        setInputdoctor({...inputdoctor,[event.target.name]:event.target.value});
    };

    const getdoctorlistapi = ()=>{
        axios.get('http://localhost:3000/medregistrationdoctor').then((result)=>{
        console.log(result.data);
        setdoctorList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };
    const onSubmitHandler = (event)=>{
        event.preventDefault();      
        axios.get(`http://localhost:3000/medregistration?doctor=${inputdoctor.doctor}&date=${inputdoctor.date}`).then((result)=>{
        if(result.data && result.data.length>0){
        setpatientList(result.data);
        console.log(result.data);
        } 
        else{
        alert(`No Appointments for ${inputdoctor.doctor}`);
        }
        }).catch((error)=>{
        console.log(error);
        });
    };


    return(<>
    <h1>Patient List For Doctors</h1>


    <form className="p_form form-group col-md-3" >
    <div className="form-group">
        <label htmlFor="inputCity">Enter Date</label>
        <input type="date" name="date" onChange={onChangeHandlerDr} className="form-control" id="inputCity"/>
        <label>Select Doctor</label>
        <select className="form-control" onChange={onChangeHandlerDr} name="doctor" id="exampleFormControlSelect1">
        {doctorList.map((val, index)=>{
        return(<option key={index} value={val.doctorname+" "+val.speciality}>{val.doctorname}-{val.speciality}</option>)
        })}
        </select>
    </div>
    <button onClick={onSubmitHandler}>Button</button>
    </form>


    <table className="table table-striped table-dark">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile</th>
      <th scope="col">Age</th>
      <th scope="col">Sex</th>
      <th scope="col">Appointment status</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Doctor</th>
    </tr>
    </thead>
    <tbody>
    {patientList.map((val, index)=>{
        return(<>
        <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{val.name}</td>
        <td>{val.mblno}</td>
        <td>{val.age}</td>
        <td>{val.sex}</td>
        <td>{val.confirm_status}</td>
        <td>{val.date}</td>
        <td>{val.appio_time}</td>
        <td>{val.doctor}</td>        
        </tr>
        </>)
    })}
    </tbody>
    </table> 

    </>)
};

export default Pdbydr;