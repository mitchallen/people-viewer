import React, { Component } from 'react';
import './PeopleCard.css';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { PeopleViewer } from './PeopleViewer';

// docker run -p 1220:3100 --name random-server mitchallen/random-server

const DEFAULT_QUERY = `http://localhost:1220/v1/people`;

export class PeopleCard extends Component<any, any> {

    state: any = {
        query: DEFAULT_QUERY,
        data: [],
        error: ""
    };

    constructor(props: any) {
        super(props);
        // Important to bind this to handleClick so this.setState in Promise will work
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (name: string) => (event: any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick() {
        console.log("app.handleClick()")
        /**
         * Create a thing-server container and start it on port 1234.
         * 
         *    docker run -p 1234:3000 --name thing-server mitchallen/thing-server
         * 
         * If the container already exists (docker run give you an error), just restart it.
         * 
         *    docker start thing-server
         * 
         */
        this.setState({ error: "" })
        const query = this.state.query;
        axios.get(query)
            .then(result => {
                /**
                 * It is important to bind this to handleClick in the constructor
                 * this.handleClick = this.handleClick.bind(this);
                 * Otherwise this.setState won't work.
                 */
                this.setState({ data: result.data })
            })
            .catch(error => {
                this.setState({ error: error.message });
                console.error(error.message)
            }
            );
    }

    render() {

        const errorChip = (<Chip icon={<ErrorOutlineIcon />} label={this.state.error} color="secondary" />);

        return (
            <div className="App" style={{ width: '100%', margin: '0 auto' }}>
                <Card style={{ width: '400px', margin: '20px auto' }}>
                    <Typography variant="h3" component="h3" style={{ margin: '20px auto' }} gutterBottom>
                        People Viewer
              </Typography>
                    <CardContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            style={{ width: '300px', margin: '0 auto' }}
                            // className={classes.textField}
                            value={this.state.query}
                            onChange={this.handleChange('query')}
                            margin="normal"
                        />
                    </CardContent>

                    <CardActions >
                        <Button variant="contained" color="primary" onClick={this.handleClick}>
                            Get People
              </Button>
                    </CardActions>

                    <CardContent>
                        {this.state.error.length > 0 ? errorChip : <PeopleViewer data={this.state.data} />}
                    </CardContent>

                </Card>
            </div>
        );
    }

};
