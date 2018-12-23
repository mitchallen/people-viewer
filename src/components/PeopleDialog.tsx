import React, { Component } from 'react';
import './PeopleDialog.css';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

interface PeopleDialogProps {
    data: any;
}

export class PeopleDialog extends Component<any, any> {

    state = {
        open: false,
        record: {},
    };

    constructor(props: PeopleDialogProps) {
        super(props);
        this.state = {
            open: this.props.open,
            record: this.props.record,
        };

        this.handleEntering = this.handleEntering.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        // this.handleChange = this.handleChange.bind(this); 
    }

    componentWillReceiveProps(nextProps: any) {
        // record
        if (nextProps.record !== this.props.record) {
            this.setState({ record: nextProps.record });
        }
        // open
        if (nextProps.open !== this.props.open) {
            this.setState({ open: nextProps.open });
        }
    }

    handleEntering = () => {
        // TODO
        console.log(JSON.stringify(this.state.record, null, 2));
    };

    // handleCancel = () => {
    //     this.props.onClose(this.props.record);
    // };

    handleOk = () => {
        // Sending back record is only useful for updates
        this.props.onClose(this.state.record);
    };

    // handleChange = (event, data) => {
    //     this.setState({ data });
    // };

    render() {
        const { value, ...other } = this.props;

        const record: any = this.state.record;

        const fields = [
            "prefix",
            "first",
            "last",
            "age",
            "birthday",
            "gender",
            "zip",
            "ssnFour",
            "phone",
            "email",
        ];

        const fieldTable = fields.map(field =>
            <DialogContentText key={field}>
                <b>{field}:</b> {record[field]}
            </DialogContentText>
        );

        return (
            <Dialog
                open={this.state.open}
                disableBackdropClick={true}
                disableEscapeKeyDown
                maxWidth="sm"
                onEntering={this.handleEntering}
                aria-labelledby="people-dialog-title"
                {...other}
            >
                <DialogTitle id="people-dialog-title">People Record</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        {JSON.stringify(record, null, 2)}
                    </DialogContentText> */}
                    {fieldTable}
                </DialogContent>
                <DialogActions>
                {/* <Button onClick={this.handleCancel} color="primary">
                    Cancel
                </Button> */}
                <Button onClick={this.handleOk} color="primary">
                    Ok
              </Button>
                </DialogActions>
            </Dialog>
        );
    }


}