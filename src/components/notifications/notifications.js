import React, { Component } from 'react';
import Noty from 'noty'



class Notification extends Component {

    showNotification(){

        new Noty ({
        type: 'success',
        id:'projectSaved',
        text: 'Your project has been successfully saved',
        theme: 'bootstrap-4',
        layout: 'topRight',
        timeout: '1000',
         }).show()
    

        }

render(){
    return(
        <div className='App'>
            <button onClick={(e)=>this.showNotification(e)}>Save &amp; Continue></button>
        </div>
    );

    }

}

export default Notification;
