import './employee.css'
import Carousel from 'react-material-ui-carousel'
import AdminTopbar from '../../components/topbar1/AdminTopbar'
import Accordion  from '@material-ui/core/Accordion'
import  AccordionSummary  from '@material-ui/core/AccordionSummary'
import AccordionDetails  from '@material-ui/core/AccordionDetails'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Employee = () => {
    
    const [emp,setEmp]=useState([]);
    const [filterdata,setFilterdata]=useState([]);
    const [query,setQuery]=useState('');

    useEffect(() => {
        axios.get("http://localhost:9001/api/v1/employees").then((response) => {
        setEmp(response.data);
        setFilterdata(response.data);
        //console.log(response.data);
        });
    }, []);
    const handlesearch=(event)=>{
        const getSearch=event.target.value;
        setQuery(getSearch)
        //console.log(getSearch)

        if(getSearch.length>0){
            const searchdata=emp.filter( (i)=>i.employeeId.toUpperCase().includes(getSearch));
            setEmp(searchdata);
        }
        else{
            setEmp(filterdata);
        }
        setQuery(getSearch);
     }

    return (
    <div className='employee-box'>
        <AdminTopbar/>
        <div className='emp-searchbar'>
            <input type="text" className='search-input' placeholder='  Search here' value={query} onChange={(e)=>handlesearch(e)}/>
            <button className='emp-search'  >Search</button>
        </div>
        <div className="employee-wrapper">
            <div className='employee-leftcontainer'>
                <div className='emp-crousel'>
                    <Carousel className='emp-carousel'>
                        <img src="https://cdn.elearningindustry.com/wp-content/uploads/2019/04/how-to-future-proof-bank-employee-training.jpeg" alt="" className='emp-image' />
                        <img src="https://www.technologyrecord.com/Portals/0/EasyDNNNews/5683/940443p512EDNmainunified-banking-.jpg" alt="" className='emp-image'/>
                        <img src="https://www.axisbank.com/annual-report-2015-2016/images/slide-4.jpg" alt="" className='emp-image'/>
                    </Carousel>
                </div>
                <div className="emp-picture">
                    
                </div>

            </div>
            <div className='employee-rightcontainer'>
                <div className='addemployee'>
                    <Accordion>
                        <AccordionSummary >
                            <p className='edittitle'>Add or Edit</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <div className='input-id'>
                                    <Link to="/editemployee"><button className='editemployeebutton' >Edit</button></Link>
                                    <Link to="/addemployee"><button className='editemployeebutton'>Add</button></Link>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div><br/><br/>
                {emp.map((e)=>
                <div className='viewemployee' key={e.emploeeId}>
                    <div className="viewemployeewrapper">
                    <img src={e.imageUrl} 
                    className="wrapperimage"alt="" />
                    </div>
                    

                    
                    <div className="viewemployeedetails">
                        <h5 className='viewemployeetitle' > EmployeeId         :{e.employeeId} </h5>
                        <h5 className='viewemployeetitle'> Name            : {e.name}</h5>
                        <h5 className='viewemployeetitle'> Email           :  {e.email} </h5>
                        <h5 className='viewemployeetitle'> Desgination     :  {e.designation}</h5>
                        <h5 className='viewemployeetitle'> Project Name    :  {e.projectName}</h5> 
                        <h5 className='viewemployeetitle'> Supervisor Name :  {e.supervisorName}</h5>
                        <h5 className='viewemployeetitle'> Phone Number    :  {e.phoneNumber}</h5>
                    
                    </div>
                
                </div>
                 )}
            </div>
           
        </div>
      
    </div>
  )
}

export default Employee
