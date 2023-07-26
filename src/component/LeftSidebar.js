import React from 'react'
import { NavLink} from 'react-router-dom'
import './LeftSidebar.css'
import Glob from '../assets/Glob.png'


const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeclassname='active'>
                <p>Home</p>
            </NavLink>
            <div className='side-nav-div' activeclassname='active' >
                <div><p>PUBLIC</p></div>
                <NavLink to='/Questions' className='side-nav-links' activeclassname='active'>
                <img src={Glob} alt='Glob' style={{width:"20px",height:"20px"}} />
                    <p style={{paddingLeft:"10px"}}>Questions</p>
                </NavLink>
                <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Tags</p>
                </NavLink>
                <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Users</p>
                </NavLink>
                <NavLink to='/Companies' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Companies</p>
                </NavLink>
            </div>
        </nav>  
    </div>
  )
}

export default LeftSidebar