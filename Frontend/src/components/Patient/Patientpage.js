import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Patient.css";

function Patientpage(){
    const navigate = useNavigate();
    useEffect(()=>{
        loginchecker();
    },[]);

    const loginchecker = ()=>{
        if(!sessionStorage.getItem("LS")===true){
            alert("Please login to continue");
            navigate("/p");
        }
    };
    const [patientList, setpatientList] = useState([]);
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
            sex: patientList[index].sex
        })
    };
    const onEditSubmitHandler = ()=>{
        axios.put(`http://localhost:4000/updatepatient/${patientList[getId]._id}`,{...editInput})
        .then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };
    useEffect(()=>{
        getpatientlistapi();
    },[]);

    const getpatientlistapi = ()=>{
        axios.get(`http://localhost:4000/getpatient/${sessionStorage.getItem("Mobile")}`).then((result)=>{
        console.log(result.data);
        setpatientList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };
    const onLogoutHandler = ()=>{
        sessionStorage.removeItem("Mobile");
        sessionStorage.removeItem("LS");
        navigate('/p')

    };

    return(<>
    <h2 className="p_center">Patient Page <button className='ap_posa btn btn-danger' onClick={onLogoutHandler}>Logout</button></h2><br/>
    <h3 className="p_center">Your Appointments</h3>
    <table className="table table-striped table-dark">
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
        <select className="form-control" onChange={onChangeHandlerSU} name="confirm_status" value={editInput.confirm_status} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="cancelled by Patient">Cancelled</option>
        </select>
    </div>
    <button onClick={onEditSubmitHandler} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Patientpage;
