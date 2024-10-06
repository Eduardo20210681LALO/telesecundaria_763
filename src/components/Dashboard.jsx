import React from 'react'
import NavBar1 from './NavBar1'

const Dashboard = ({sidebarToggle, setSidebarToggle}) => {
    return (
        <div className={`${sidebarToggle ? "" : "ml-64"} w-full`}>
            <NavBar1
            sidebarToggle={sidebarToggle} 
            setSidebarToggle={setSidebarToggle}/>
        </div>
    )
}

export default Dashboard