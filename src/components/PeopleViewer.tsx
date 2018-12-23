
import React, { Component } from 'react';
import './PeopleViewer.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';

import { PeopleDialog } from './PeopleDialog';


interface PeopleViewerProps {
  data: any;
}

export class PeopleViewer extends Component<any, any> {

  state = {
    openKey: "",
    data: [],
  };

  constructor(props: PeopleViewerProps) {
    super(props);
    this.state = {
      openKey: "",
      data: this.props.data,
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  }

  handleClickListItem = (email: string) => (event: any) => {
    console.log(email);
    this.setState({ openKey: email});
  };

  handleClose = ( record: any) => {
    // ignore record for now - could use for update dialog
    // console.log(JSON.stringify(record));  
    this.setState({ openKey: '' });
  };

  render() {
    // const { data, ...other } = this.props;

    const darkPink = '#E75480';

    const listItems = this.state.data.map((el: any) =>
      <React.Fragment key={el.email}>
        <ListItem button onClick={this.handleClickListItem(el.email)}>
          <ListItemIcon>
            <FaceIcon style={{ color: el.gender == 'female' ? darkPink : 'blue' }} />
          </ListItemIcon>
          <ListItemText primary={el.last + ", " + el.first} secondary={el.email} />
        </ListItem>
        <PeopleDialog 
          open={this.state.openKey === el.email}
          onClose={this.handleClose}
          record={el}
        />
      </React.Fragment>
    );

    return (
      <List component="nav">
        {listItems}
      </List>
    );
  }
}



