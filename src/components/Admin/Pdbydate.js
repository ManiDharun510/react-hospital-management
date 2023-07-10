import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Pdbydate(){
    const [patientList, setpatientList] = useState([]);
    const [inputdate, setInputdate] = useState({
        date:""
    });
    const onChangeHandler = (event)=>{
        setInputdate({...inputdate,[event.target.name]:event.target.value});
    };
    const onSubmitHandler = (event)=>{
        event.preventDefault();      
        axios.get(`http://localhost:3000/medregistration?date=${inputdate.date}`).then((result)=>{
        if(result.data && result.data.length>0){
        setpatientList(result.data);
        console.log(result.data);
        } 
        else{
        alert(`No Appointments on ${inputdate.date}`);
        }
        }).catch((error)=>{
        console.log(error);
        });
    };



    return(<>
    <h3 className="">Patient Details By Date</h3>
    
    <form>
    <div className="form-row">
    <div className="form-group col-md-2">
    <label htmlFor="inputCity">Enter Date</label>
    <input type="date" name="date" onChange={onChangeHandler} className="form-control" id="inputCity"/>
    </div>
    </div>
    <button type="submit" onClick={onSubmitHandler} className="btn btn-primary">Show Details</button>
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
      {/* <th scope="col">Edit</th> */}
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
        {/* <td><button onClick={()=>{editingBindHandler(index)}} data-toggle="modal" data-target="#patient">Edit</button></td> */}
        {/* <td><button onClick={()=>{onDeleteHandler(index)}}>Delete</button></td> */}
        
        </tr>
        </>)
    })}
    </tbody>
    </table>    
    </>)
}
export default Pdbydate;