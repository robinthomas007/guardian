import React, { Component } from 'react';
import {Table, Grid, Button, Form, Alert } from 'react-bootstrap'; 

class CoverArtDrop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectCoverArt : ''
        }
    
    
        this.albumArt = this.albumArt.bind(this);
    }

    handleCoverChange(file) {
        const {projectCoverArt} = this.state;
        let modifiedProjectCoverArt = projectCoverArt;

        let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                modifiedProjectCoverArt['projectCoverArt'] = reader.result;
            }
            reader.onerror = function() {
                modifiedProjectCoverArt['projectCoverArt'] = '';
            }

        //this.setState({formInputs : updatedFormInputs})
    };

    albumArt(e) {

        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (!file.type.startsWith('image/')){ continue }
            const img = document.createElement("img");
                  img.src = window.URL.createObjectURL(files[i]);
                  img.height = 188;
                  img.width = 188;
                  img.classList.add("obj");
                  img.file = file;
                  img.id = 'projectCoverArt';

            const preview = document.getElementById('preview')
                  preview.appendChild(img);
            
            const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = (function(aImg) { 
                      return function(e) { 
                          aImg.src = e.target.result; 
                      }; 
                  })(img);

            this.handleCoverChange(file);  
        }
    }

    setCoverArt(imgSrc) {
        const img = document.createElement("img");
              img.src = imgSrc;
              img.height = 188;
              img.width = 188;
              img.classList.add("obj");
              img.id = 'projectCoverArt';
              //img.file = file;

        const preview = document.getElementById('preview')
              preview.appendChild(img);
              
    }

    render() {
        return(
            <div id="preview" dropppable="true" className="form-control album-art-drop col-8">
                <Button 
                    id="removeAlbumArt"
                    className="btn btn-secondary action remove-art" 
                    onClick={this.props.clearCoverArt}
                ><i className="material-icons">delete</i>
                </Button>
                <span>
                    Click to Browse<br />
                    or Drag &amp; Drop
                </span>  
                <input 
                    id="projectCoverArt" 
                    type="file" 
                    onChange={this.albumArt} 
                />
                <div className="browse-btn">
                    <span>Browse Files</span>
                    <input 
                        id="projectCoverArtData" 
                        type="file" 
                        title="Browse Files" 
                        onChange={this.albumArt}
                    />
                </div>
            </div>
        )
    }
}
export default CoverArtDrop;


