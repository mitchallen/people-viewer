
import React from 'react';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import Divider from '@material-ui/core/Divider';

import './PeopleViewer.css';

interface PeopleViewerProps {
  data: any;
}

export class PeopleViewer extends React.Component<any, any> {

  state = {
    data: [],
  };

  constructor( props: PeopleViewerProps) {
    super(props);
    this.state = {
      data: this.props.data,
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  }

  handleClickListItem = (name: string) => (event: any) => {
    console.log(name);
    // this.setState({
    //   [name]: event.target.value,
    // });
  };

  render() {
    // const { data, ...other } = this.props;

    const darkPink = '#E75480';

    const listItems = this.state.data.map((el: any) =>
      <ListItem button key={el.email} onClick={this.handleClickListItem(el.email)}>
        <ListItemIcon>
          <FaceIcon style={{color: el.gender == 'female' ? darkPink : 'blue'}} />
        </ListItemIcon>
        <ListItemText primary={el.last + ", " + el.first} secondary={el.email}  />
      </ListItem>);

    return (
      <List component="nav">
        {listItems}
      </List>
    );
  }
}



