import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { fetchLabels } from 'redux/labels/actions';
import { Field } from 'redux-form';

const LabelSelect = props => {
    const getLabelOptions = () => {
        let { labels } = props;
        if (props.forCreate) labels = [{ id: '', name: '' }].concat(labels);
        return labels.map(option => {
            return <option value={option.id}>{option.name}</option>;
        });
    };

    const { input } = props;

    return (
        <Form.Control
            id={props.id}
            as="select"
            className={props.className}
            value={props.selected}
            onChange={props.onChange || (event => input.onChange(event.target.value))}
            name={props.name}
        >
            {getLabelOptions()}
        </Form.Control>
    );
};

class LabelsDropDown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchLabels();
    }

    render() {
        return (
            <div>
                <Form.Label id="labelName">Label/Company</Form.Label>
                <Field name={this.props.name} component={LabelSelect} {...this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { labels } = state.labels;
    return { labels };
}

const actionCreators = { fetchLabels };

export default connect(
    mapStateToProps,
    actionCreators
)(LabelsDropDown);
