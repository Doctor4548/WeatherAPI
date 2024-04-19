import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Header(){
    return(
        <div>
            <div className="header">
                <Link to="weather">Weather</Link>
                <Link to=".">Sudoku</Link>

            </div>
            <Outlet />

        </div>

    )
}