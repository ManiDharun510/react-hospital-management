import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Patientdetails(){
    const navigate = useNavigate();
    const [patientList, setpatientList] = useState([]);
    const [doctorList, setdoctorList] = useState([]);

    // const [input, setInput] = useState({
    //     appio_time:"",
    //     confirm_status:""
    // });

    const [editInput, seteditInput] = useState({
        address: "",
            age: "",
            appio_time:"",
            confirm_status: "",
            date: "",
            doctor: "",
            mblno: "",
            name: "",
            sex: "",
            status:""
    });
    
    const [getId, setId] = useState(-1);

    const onChangeHandlerSU = (event)=>{
            seteditInput({...editInput,[event.target.name]:event.target.value});
        };

    useEffect(()=>{
        getpatientlistapi();
    },[]);

    const getpatientlistapi = ()=>{
        axios.get('http://localhost:3000/medregistration').then((result)=>{
        console.log(result.data);
        setpatientList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };

    const editingBindHandler = (index)=>{
        setId(index);
        seteditInput({
            address: patientList[index].address,
            age: patientList[index].age,
            appio_time:patientList[index].appio_time,
            confirm_status: patientList[index].confirm_status,
            date: patientList[index].date,
            doctor: patientList[index].doctor,
            mblno: patientList[index].mblno,
            name: patientList[index].name,
            sex: patientList[index].sex,
            status: patientList[index].status
        })
    };

    const onEditSubmitHandler = ()=>{
        axios.put(`http://localhost:3000/medregistration/${patientList[getId].id}`,{...editInput}).then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };

    const onDeleteHandler = (index)=>{
        axios.delete(`http://localhost:3000/medregistration/${patientList[index].id}`).then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const getdoctorlistapi = ()=>{
        axios.get('http://localhost:3000/medregistrationdoctor').then((result)=>{
        console.log(result.data);
        setdoctorList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };

    return(<>
    <h1 className='a_center'>Patient Details</h1>
    <button className='a_flo_button' onClick={()=>{navigate('/pdd')}}>Show By Date</button>
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
      <th scope="col">Patient Status</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
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
        <td>{val.status}</td>
        <td><button className="btn btn-primary" onClick={()=>{editingBindHandler(index)}} data-toggle="modal" data-target="#patient">Edit</button></td>
        <td><button className="btn btn-danger" onClick={()=>{onDeleteHandler(index)}}>Delete</button></td>
        
        </tr>
        </>)
    })}
    </tbody>
    </table>


    {/* --------------------------------------Modal Edit Code------------------------------------------ */}

    {/*<h1 className='a_center'>Admin page</h1>
    <h3>Add Patient</h3>
     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#patient">Add Patient</button><br/><br/>
    <button type="button" className="btn btn-primary">View patient</button> */}
    <div className="modal fade bd-example-modal-md" id="patient" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
    <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={editInput.name} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
        <label>Mobile No</label>
        <input type="number" name="mblno" value={editInput.mblno} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Mobile no"/>
        </div>

        <div className="form-group">
        <label>Age</label>
        <input type="number" name="age" value={editInput.age} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Age"/>
        </div>

        <div className="form-group">
        <label>Sex</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="sex" value={editInput.sex} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
        </select>
        </div>

        <div className="form-group">
        <label>Select Doctor</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="doctor" value={editInput.doctor} id="exampleFormControlSelect1">
        {doctorList.map((val, index)=>{
        return(<option key={index} value={val.doctorname+" "+val.speciality}>{val.doctorname}-{val.speciality}</option>)
        })}
        </select>
        </div>

        <div className="form-group">
        <label>Address</label>
        <input type="text" name="address" value={editInput.address} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Address"/>
        </div>

        <div className="form-group">
        <label>Appointment Date</label>
        <input type="date" name="date" value={editInput.date} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter date"/>
        </div>

        <div className="form-group">
        <label>Appointment Time</label>
        <input type="time" name="appio_time" value={editInput.appio_time} onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Time"/>
        </div>

        <div className="form-group">
        <label>Appointment Status</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="confirm_status" value={editInput.confirm_status} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
        </select>
        </div>

        <div className="form-group">
        <label>Patient Status</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="status" id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="active">Active</option>
        <option value="inactive">In-active</option>
        </select>
        </div>

        <button onClick={onEditSubmitHandler} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Patientdetails;
