import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Adminpage(){

    //======================================== Patient Details=====================================//
    const navigate = useNavigate();

    useEffect(()=>{
        loginchecker();
    },[]);

    const loginchecker = ()=>{
        if(!sessionStorage.getItem("LS")===true){
            alert("Please login to continue");
            navigate("/a");
        }
    };

    const [input, setInput] = useState({
        appio_time:"",
        confirm_status:"",
        status:""
    });
    const onChangeHandlerSU = (event)=>{
        let name= event.target.name;
        let value= event.target.value;
        setInput({...input, [name]: value})
        
    };
    const clearingData = ()=>{
        setInput({
            name: "",
            mblno: "",
            age: "",
            address: ""
        })
    };
    const onSubmitHandlerSU = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/medregistration', input).then((value)=>{
        sessionStorage.setItem("email", input.email);
        sessionStorage.setItem("LS", "true");
        console.log(value.data);
        clearingData();
        navigate('/pd');
    }).catch((error)=>{
        console.log(error);
    });
    };

    //======================================== Doctor Details=====================================//

    const [inputdr, setInputdr] = useState({});
    const [doctorList, setdoctorList] = useState([]);

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const onChangeHandlerDr = (event)=>{
        let name= event.target.name;
        let value= event.target.value;
        setInputdr({...inputdr, [name]: value})
        
    };
    const clearingDatadr = ()=>{
        setInput({
            name: "",
            mblno: "",
            age: "",
            address: ""
        })
    };
    const onSubmitHandlerDr = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/medregistrationdoctor', inputdr).then((value)=>{
        sessionStorage.setItem("email", inputdr.email);
        sessionStorage.setItem("LS", "true");
        console.log(value.data);
        clearingDatadr();
        navigate('/dd');
    }).catch((error)=>{
        console.log(error);
    });
    };

    const getdoctorlistapi = ()=>{
        axios.get('http://localhost:3000/medregistrationdoctor').then((result)=>{
        console.log(result.data);
        setdoctorList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };
    const onLogoutHandler = ()=>{
        sessionStorage.removeItem("doctoremail");
        sessionStorage.removeItem("LS");
        navigate('/a')
    }



    return(<>


{/* ---------------------------------------------------PATIENT DETAILS MODAL-------------------------------------------------------- */}

    <h1 className='a_center' >Admin page<button className='ap_posa btn btn-danger' onClick={onLogoutHandler}>Logout</button></h1>

    <h3>Add Patient</h3>
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#patient">Add Patient</button><br/><br/>
    <button type="button" onClick={()=>{navigate('/pd')}} className="btn btn-primary">View patient</button>
    <div className="modal fade bd-example-modal-md" id="patient" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
        <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
        <label>Mobile No</label>
        <input type="number" name="mblno" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Mobile no"/>
        </div>

        <div className="form-group">
        <label>Age</label>
        <input type="number" name="age" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Age"/>
        </div>

        <div className="form-group">
        <label>Sex</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="sex" id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
        </select>
        </div>

        <div className="form-group">
        <label>Select Doctor</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="doctor" id="exampleFormControlSelect1">
        {doctorList.map((val, index)=>{
        return(<option key={index} value={val.doctorname+" "+val.speciality}>{val.doctorname}-{val.speciality}</option>)
        })}
        </select>
        </div>

        <div className="form-group">
        <label>Address</label>
        <input type="text" name="address" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Address"/>
        </div>

        <div className="form-group">
        <label>Appointment Date</label>
        <input type="date" name="date" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter date"/>
        </div>

        <div className="form-group">
        <label>Appointment Time</label>
        <input type="time" name="appio_time" onChange={onChangeHandlerSU} className="form-control" placeholder="Enter Time"/>
        </div>

        <div className="form-group">
        <label>Appointment Status</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="confirm_status" id="exampleFormControlSelect1">
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

        

        <button onClick={onSubmitHandlerSU} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>

{/* ---------------------------------------------------DOCTOR DETAILS MODAL-------------------------------------------------------- */}

    <h3>Add Doctor</h3>
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#doctor">Add Doctor</button><br/><br/>
    <button type="button" onClick={()=>{navigate('/dd')}} className="btn btn-primary">View Doctor</button>
    <div className="modal fade bd-example-modal-md" id="doctor" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
        <div className="form-group">
        <label>Name</label>
        <input type="text" name="doctorname" onChange={onChangeHandlerDr} className="form-control" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
        <label>Name</label>
        <input type="email" name="doctoremail" onChange={onChangeHandlerDr} className="form-control" placeholder="Enter Email"/>
        </div>

        <div className="form-group">
        <label >Specialist</label>
        <select className="form-control" onChange={onChangeHandlerDr} name="speciality" id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="general doctor">General Doctor</option>
        <option value="dermatology">Dermatology</option>
        <option value="cardiology">Cardiology</option>
        <option value="urology">Urology</option>
        </select>
        </div>

        <button type="submit" onClick={onSubmitHandlerDr} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Adminpage;
