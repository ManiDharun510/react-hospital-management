import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Admin.css";

function Doctordetails(){
    const navigate = useNavigate();
    const [doctorList, setdoctorList] = useState([]);
    const [editInput, seteditInput] = useState({
        doctorname: "",
        speciality: "",
        doctoremail:""
    });
    const [getId, setId] = useState(-1);

    useEffect(()=>{
        getdoctorlistapi();
    },[]);

    const onChangeHandlerDr = (event)=>{
        seteditInput({...editInput,[event.target.name]:event.target.value});
    };

    const getdoctorlistapi = ()=>{
        axios.get('http://localhost:3000/medregistrationdoctor').then((result)=>{
        console.log(result.data);
        setdoctorList(result.data);
    }).catch((error)=>{
        console.log(error);
    })
    };

    const editingBindHandler = (index)=>{
        setId(index);
        seteditInput({
            doctorname: doctorList[index].doctorname,
            speciality: doctorList[index].speciality
        })
    };

    const onEditSubmitHandler = ()=>{
        axios.put(`http://localhost:3000/medregistrationdoctor/${doctorList[getId].id}`,{...editInput}).then(()=>{
            getdoctorlistapi();
        }).catch(()=>{

        })
    };

    const onDeleteHandler = (index)=>{
        axios.delete(`http://localhost:3000/medregistrationdoctor/${doctorList[index].id}`).then(()=>{
            getdoctorlistapi();
        }).catch(()=>{

        })
    };

    return(<>
    <h1>Doctor details page</h1>
    <table className="table table-striped table-dark">
    <thead>
    <tr>
      <th scope="col">SL.No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Speciality</th>
      <th scope="col">Modify</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    <tbody>
    {doctorList.map((val, index)=>{
        return(<>
        <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{val.doctorname}</td>
        <td>{val.doctoremail}</td>
        <td>{val.speciality}</td>
        <td><button onClick={()=>{editingBindHandler(index)}} data-toggle="modal" data-target="#doctor">Edit</button></td>
        <td><button onClick={()=>{onDeleteHandler(index)}}>Delete</button></td> 
        
        </tr>
        </>)
    })}
    </tbody>
    </table>

    {/* ----------------------------------------------------------Editing Modal------------------------------ */}
    <div className="modal fade bd-example-modal-md" id="doctor" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-md">
    <div className="modal-content">  
    <form className="p_form">
        <div className="form-group">
        <label>Name</label>
        <input type="text" name="doctorname" value={editInput.doctorname} onChange={onChangeHandlerDr} className="form-control" placeholder="Enter Name"/>
        </div>

        <div className="form-group">
        <label>Email</label>
        <input type="email" name="doctoremail" value={editInput.doctoremail} onChange={onChangeHandlerDr} className="form-control" placeholder="Enter Email"/>
        </div>

        <div className="form-group">
        <label >Specialist</label>
        <select className="form-control" onChange={onChangeHandlerDr} name="speciality" value={editInput.speciality} id="exampleFormControlSelect1">
        <option value="none">-</option>
        <option value="general doctor">General Doctor</option>
        <option value="dermatology">Dermatology</option>
        <option value="cardiology">Cardiology</option>
        <option value="urology">Urology</option>
        </select>
        </div>

        <button type="submit" onClick={onEditSubmitHandler} className="btn btn-primary">Submit</button>
    </form>    
    </div>
    </div>
    </div>
    </>)
}
export default Doctordetails;