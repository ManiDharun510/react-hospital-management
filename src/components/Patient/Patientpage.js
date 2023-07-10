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
        axios.put(`http://localhost:3000/medregistration/${patientList[getId].id}`,{...editInput}).then(()=>{
            getpatientlistapi();
        }).catch(()=>{

        })
    };
    useEffect(()=>{
        getpatientlistapi();
    },[]);

    const getpatientlistapi = ()=>{
        axios.get(`http://localhost:3000/medregistration?mblno=${sessionStorage.getItem("Mobile")}`).then((result)=>{
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
    <h1 className="p_center">Patient Page</h1><br/>
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
        <td><button onClick={()=>{editingBindHandler(index)}} data-toggle="modal" data-target="#patient">Edit</button></td>
        {/* <td><button onClick={()=>{onDeleteHandler(index)}}>Delete</button></td> */}
        
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

    <button onClick={onLogoutHandler}>Logout</button>
    </>)
}
export default Patientpage;



{/* <h3>Enter your details</h3>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-md">Enter Details</button>
    <div class="modal fade bd-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
    <div class="modal-content">  
    <form class="p_form">
        <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Enter Name"/>
        </div>

        <div class="form-group">
        <label>Age</label>
        <input type="number" class="form-control" placeholder="Enter Age"/>
        </div>

        <div class="form-group">
        <label for="exampleFormControlSelect1">Sex</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
        </select>
        </div>

        <div class="form-group">
        <label>Address</label>
        <input type="text" class="form-control" placeholder="Enter Address"/>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>

    <h3>Book an appointment</h3>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-md">Book an appointment</button>
    <div class="modal fade bd-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md">
    <div class="modal-content">  
    <form class="p_form">
        <div class="form-group">
        <label>Disease</label>
        <input type="text" class="form-control" placeholder="Enter Your Disease"/>
        </div>

        <div class="form-group">
        <label>Age</label>
        <input type="number" class="form-control" placeholder="Enter Age"/>
        </div>

        <div class="form-group">
        <label for="exampleFormControlSelect1">Sex</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
        </select>
        </div>

        <div class="form-group">
        <label>Address</label>
        <input type="text" class="form-control" placeholder="Enter Address"/>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div> */}