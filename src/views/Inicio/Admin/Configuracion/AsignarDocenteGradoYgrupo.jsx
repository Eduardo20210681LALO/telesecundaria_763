import React, { useState, useEffect } from 'react';
import Sidebar1 from '../../../../components/Sidebar1';
import NavBar1 from '../../../../components/NavBar1';

function AsignarDocenteGradoYgrupo() {
    const [sidebarToggle, setSidebarToggle] = useState(false);

    return (
        <div className="flex">
            <Sidebar1 sidebarToggle={sidebarToggle}/>

            <div className="flex flex-col w-full">
                <NavBar1 sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            </div>
        </div>
    )
}

export default AsignarDocenteGradoYgrupo