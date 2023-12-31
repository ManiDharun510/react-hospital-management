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
    
    const [patienttoday, setpatienttoday] = useState([]);
    const [getId, setId] = useState(-1);

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const getdoctorlistapi = ()=>{
        axios.get(`http://localhost:4000/getdoctor/${sessionStorage.getItem("doctoremail")}`).then((result)=>{
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
        getpatienttodayapi();
    },[doctorDetails]);

    const getpatienttodayapi = ()=>{
        axios.get(`http://localhost:4000/todaypatientlist/${doctorDetails[0].doctorname+" "+doctorDetails[0].speciality}`).then((result)=>{
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
    const editSubmitHandler = ()=>{
        axios.put(`http://localhost:4000/updatepatient/${patienttoday[getId]._id}`,{...editInput})
        .then(()=>{
            getpatienttodayapi();
        }).catch(()=>{

        })
    };

    const onChangeHandler = (event)=>{
            seteditInput({...editInput,[event.target.name]:event.target.value});
    };
    const onLogoutHandler = ()=>{
        sessionStorage.removeItem("doctoremail");
        sessionStorage.removeItem("LS");
        navigate('/d')
    };

    return(<>

    <h2 className='a_center'>Doctor page<button className='ap_posa btn btn-danger' onClick={onLogoutHandler}>Logout</button></h2>
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

    <div className="modal fade bd-example-modal-md" id="patient" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
    <div className="form-group"></div>

    <div className="form-group">
        <label>Appointment Status</label>
        <select className="form-control" onChange={onChangeHandler} name="confirm_status" value={editInput.confirm_status} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="Confirmed by Doctor">Confirmed</option>
        <option value="Cancelled by Doctor">Cancelled</option>
        </select>
    </div>
    <button onClick={editSubmitHandler} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Doctorpage;