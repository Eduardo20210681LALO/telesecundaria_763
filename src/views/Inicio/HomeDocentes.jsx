import React from 'react'
import NavDocentes from '../../components/NavDocentes';
import DashboardDocentes from '../../components/DashboardDocentes';

function HomeDocentes() {
    return (
        <div className='h-full'>
            <NavDocentes/>
            <DashboardDocentes/>
        </div>
    )
}

export default HomeDocentes