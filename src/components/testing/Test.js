import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Test(){
  useEffect(()=>{

  },[]);
    const [data, setData] = useState("data");
    

    let onchangehandler = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        setData({[name]:value});
    };
    let cleardata = (event)=>{
        event.preventDefault();
        setData({
            name:""
        })
    }
    let onsubmithdr = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/medregistrationadmin', data).then(()=>{
            cleardata();
        })
    };
    const [test, settest] = useState("hai");
    useEffect(()=>{
      setData("gafdga")
    },[test]);
    const trigger =()=>{  
      settest("bye");
      };

    useEffect(()=>{
      testapi();
    },[test]);


    const testapi = ()=>{
      settest("oii");
    };

    return(<>
    <h1>{data}</h1>
    <button className="btn btn-primary" onClick={()=>{settest("oii")}}>button</button>
    <Link to='/a' target='_blank'></Link>
  

    {/* <form>
        <input type="text" name="name" onChange={onchangehandler}/>
        <button onClick={onsubmithdr}>button</button>
        <button onClick={cleardata}>reset</button>
    </form> */}

{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       kni sani
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        vinimani
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

{/* ====================================================double============================================================ */}

    </>)
}
export default Test;