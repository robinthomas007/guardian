import React, { Component } from 'react';
import '../ui/LoadingImgSm.css';


class LoadingImgSm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render () {
        if (this.props.show){
            return(
                
                    <div className="loading-bars">
                      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#333">
                          <g transform="matrix(1 0 0 -1 0 16)">
                              <rect x="2" width="2" height="16" rx="3">
                                  <animate attributeName="height"
                                      begin="0s" dur="4.3s"
                                      values="2;4;5;8;14;12;6;15;2" calcMode="linear"
                                      repeatCount="indefinite" />
                              </rect>
                              <rect x="5" width="2" height="16" rx="3">
                                  <animate attributeName="height"
                                      begin="0s" dur="2.4s"
                                      values="16;5;13;7;2;9;16" calcMode="linear"
                                      repeatCount="indefinite" />
                              </rect>
                              <rect x="8" width="2" height="16" rx="3">
                                  <animate attributeName="height"
                                      begin="0s" dur="1.4s"
                                      values="5;14;16;3;6;5" calcMode="linear"
                                      repeatCount="indefinite" />
                              </rect>
                              <rect x="11" width="2" height="16" rx="3">
                                  <animate attributeName="height"
                                      begin="0s" dur="2s"
                                      values="3;5;13;8;6;3" calcMode="linear"
                                      repeatCount="indefinite" />
                              </rect>
                              <rect x="14" width="2" height="16" rx="3">
                                  <animate attributeName="height"
                                      begin="0s" dur="2.4s"
                                      values="13;5;13;8;6;13" calcMode="linear"
                                      repeatCount="indefinite" />
                              </rect>
                          </g>
                      </svg>
                   </div>
               
            )
        } else {
        
            return(null)
        }
    }
}

export default LoadingImgSm;