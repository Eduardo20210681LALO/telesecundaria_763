import React from 'react'
import NavBar2 from './NavBar2'

const Dashboard2 = ({sidebarToggle2, setSidebarToggle2}) =>{
    return (
        <div className={`${sidebarToggle2 ? "" : "ml-64"} w-full`}>
            <NavBar2
            sidebarToggle2={sidebarToggle2} 
            setSidebarToggle2={setSidebarToggle2}/>
        </div>
    )
}

export default Dashboard2