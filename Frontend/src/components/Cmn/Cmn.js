import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import "./Cmn.css";

function Cmn(){
    const navigate = useNavigate();
    return(<>
    <form className='a_center'>
    <h2>Hospital Management page</h2><br/>
    <h3>Admin Page</h3>
    <Link  target='_blank' className="btn btn-primary" to='/a' >Admin Page</Link>
    <br/>
    <br/>
    <h3>Doctor Page</h3>
    <Link target='_blank' className="btn btn-primary" to='/d'>Doctor Page</Link>
    <br/>
    <br/>
    <h3>Patient Page</h3>
    <Link target='_blank' className="btn btn-primary" to='/p'>Patient Page</Link>
    </form>
    </>)
}

export default Cmn;
