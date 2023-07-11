import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Doctor.css";

function Doctorpage(){
    const navigate = useNavigate();
    useEffect(()=>{
        loginchecker();
    },[]);
    const loginchecker = ()=>{
        if(!sessionStorage.getItem("LS")===true){
            alert("Please login to continue");
            navigate("/d");
        }
    };
    const [doctorDetails, setdoctorDetails] = useState([
        {
            doctorname:"",
            speciality:""
        }
    ]);
    const [patientDetails, setpatientDetails] = useState([]);
    const [patienttoday, setpatienttoday] = useState([]);
    const [toggle, settoggle] = useState(true);

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const getdoctorlistapi = ()=>{
        axios.get(`http://localhost:3000/medregistrationdoctor?doctoremail=${sessionStorage.getItem("doctoremail")}`).then((result)=>{
        console.log(result.data);
        setdoctorDetails(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };

    const d = new Date();
    const mon = d.getMonth()+1;
    const cmon = mon<10 ? 0+""+mon : mon;
    const year = `${d.getFullYear()+"-"+cmon+"-"+d.getDate()}`;
    
    useEffect(()=>{
        getpatientlistapi();
    },[doctorDetails]);

    const getpatientlistapi = ()=>{
        axios.get(`http://localhost:3000/medregistration?doctor=${doctorDetails[0].doctorname+" "+doctorDetails[0].speciality}`).then((result)=>{
        console.log(result.data);
        setpatientDetails(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };

    useEffect(()=>{
        getpatienttodayapi();
    },[doctorDetails]);

    const getpatienttodayapi = ()=>{
        axios.get(`http://localhost:3000/medregistration?doctor=${doctorDetails[0].doctorname+" "+doctorDetails[0].speciality}&date=${year}`).then((result)=>{
        console.log(result.data);
        setpatienttoday(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };
    const editingBindHandler = (index)=>{
        setId(index);
        seteditInput({
            address: patienttoday[index].address,
            age: patienttoday[index].age,
            appio_time:patienttoday[index].appio_time,
            confirm_status: patienttoday[index].confirm_status,
            date: patienttoday[index].date,
            doctor: patienttoday[index].doctor,
            mblno: patienttoday[index].mblno,
            name: patienttoday[index].name,
            sex: patienttoday[index].sex
        })
    };
    const onEditSubmitHandler = ()=>{
        axios.put(`http://localhost:3000/medregistration/${patienttoday[getId].id}`,{...editInput}).then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };
    const editingBindHandleroverall = (index)=>{
        setId(index);
        seteditInput({
            address: patientDetails[index].address,
            age: patientDetails[index].age,
            appio_time:patientDetails[index].appio_time,
            confirm_status: patientDetails[index].confirm_status,
            date: patientDetails[index].date,
            doctor: patientDetails[index].doctor,
            mblno: patientDetails[index].mblno,
            name: patientDetails[index].name,
            sex: patientDetails[index].sex
        })
    };
    const onEditSubmitHandleroverall = ()=>{
        axios.put(`http://localhost:3000/medregistration/${patientDetails[getId].id}`,{...editInput}).then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };
    const [editInput, seteditInput] = useState({
        address: "",
            age: "",
            appio_time:"",
            confirm_status: "",
            date: "",
            doctor: "",
            mblno: "",
            name: "",
            sex: ""
    });
    const [getId, setId] = useState(-1);

    const onChangeHandlerSU = (event)=>{
            seteditInput({...editInput,[event.target.name]:event.target.value});
    };
    const onLogoutHandler = ()=>{
        sessionStorage.removeItem("doctoremail");
        sessionStorage.removeItem("LS");
        navigate('/d')

    };

    const toggleswitch = ()=>{
        settoggle(false);
    };
    const toggleswitch1 = ()=>{
        settoggle(true);
    };

    return(<>

    <h2 className='a_center'>Doctor page<button className='ap_posa btn btn-danger' onClick={onLogoutHandler}>Logout</button></h2>
    {toggle ? <button  onClick={toggleswitch}>Overall Schedule</button> : <button onClick={toggleswitch1}>Today Schedule</button>}

    {toggle ? 
    // ------------------Todays Patient List---------------------------//
    <table className="table table-striped table-dark">
    <caption>Today's Schedule</caption>
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile</th>
      <th scope="col">Age</th>
      <th scope="col">Sex</th>
      <th scope="col">Appointmnet status</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Doctor</th>
      <th scope="col">Edit</th>
    </tr>
    </thead>
    <tbody>
    {patienttoday.map((val, index)=>{
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
        <td><button className="btn btn-warning" onClick={()=>{editingBindHandler(index)}} data-toggle="modal" data-target="#patient">Edit</button></td>
        </tr>
        </>)
    })}
    </tbody>
    </table>
        :
    // ------------------Overall Patient List---------------------------//
    <table className="table table-striped table-dark">
    <caption>Overall Schedule</caption>
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile</th>
      <th scope="col">Age</th>
      <th scope="col">Sex</th>
      <th scope="col">Appointmnet status</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Doctor</th>
      <th scope="col">Edit</th>
    </tr>
    </thead>
    <tbody>
    {patientDetails.map((val, index)=>{
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
        <td><button className="btn btn-warning" onClick={()=>{editingBindHandleroverall(index)}} data-toggle="modal" data-target="#modaloverall">Edit</button></td>
        </tr>
        </>)
    })}
    </tbody>
    </table>}

    {/* // ------------------Todays patient list modal   ----------------------------------// */}
    <div className="modal fade bd-example-modal-md" id="patient" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
    <div className="form-group"></div>

    <div className="form-group">
        <label>Appointment Status</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="confirm_status" value={editInput.confirm_status} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="Confirmed by Doctor">Confirmed</option>
        <option value="Cancelled by Doctor">Cancelled</option>
        </select>
    </div>
    <button onClick={onEditSubmitHandler} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>

    {/* // ------------------Overall patiet list model---------------------------// */}
    <div className="modal fade bd-example-modal-md" id="modaloverall" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
    <div className="form-group"></div>

    <div className="form-group">
        <label>Appointment Status</label>
        <select className="form-control" onChange={onChangeHandlerSU} name="confirm_status" value={editInput.confirm_status} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="Confirmed by Doctor">Confirmed</option>
        <option value="Cancelled by Doctor">Cancelled</option>
        </select>
    </div>
    <button onClick={onEditSubmitHandleroverall} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Doctorpage;