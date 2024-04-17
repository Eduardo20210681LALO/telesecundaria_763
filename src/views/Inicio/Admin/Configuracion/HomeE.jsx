import React from 'react'
import { Link } from 'react-router-dom'

function HomeE() {
    return (
        <div className='App'>

        <h5>Home de todo los dos</h5>

        <nav>
            <ul>
                <li>
                    <Link to={"/ListUsers"}>List Users</Link>
                </li>
                <li>
                    <Link to={"/CreateUsers"}>Create Users</Link>
                </li>
            </ul>
        </nav>

    </div>
    )
}

export default HomeE