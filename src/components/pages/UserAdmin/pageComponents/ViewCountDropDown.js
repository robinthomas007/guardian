import React, { Component } from 'react';

class ViewCountDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getOptions = () => {
        return(
            this.props.data.map((option, i) => {
                return (
                    <a key={i} className="dropdown-item" onClick={val => this.props.onChange(option)}>
                        {option}
                    </a>
                );
            })
        )
    };

    render() {
        return(
            <div className="dropdown show">
                <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="viewCountdropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >

                    {this.props.defaultValue}
                </a>
                <div className="dropdown-menu" aria-labelledby="viewCountdropdown">
                    {this.getOptions()}
                </div>
            </div>
        )
    }
};

export default ViewCountDropDown;
