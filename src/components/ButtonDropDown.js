import React, { Component } from 'react';

const ButtonDropDown = (props) => {

    return(
        <div className="dropdown">
            <button 
                type="button" 
                id="selectRightsDropdown" 
                className="btn btn-secondary dropdown-toggle" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
            >Select a Saved Rights Set</button>

            <div className="dropdown-menu" aria-labelledby="selectRightsDropdown">
                <a className="dropdown-item" value="rs1" onClick={ () => {return(alert(123))}} href="#">Saved Rights Set 1</a>
                <a className="dropdown-item" value="rs2" href="#">Saved Rights Set 2</a>
                <a className="dropdown-item" href="#">Saved Rights Set 3</a>
                <a className="dropdown-item" href="#">Saved Rights Set 4</a>
                <a className="dropdown-item" href="#">Saved Rights Set 5</a>
            </div>
        </div>
    )

} ;


export default ButtonDropDown;