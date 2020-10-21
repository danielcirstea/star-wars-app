import React from 'react';
import { Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'yellow',
    },
    appBar: {
      backgroundColor: 'black',
      backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png)'
    },
    toolbarButtons: {
      marginLeft: 'auto',
    },
  }),
);

const Main = (props: RouteComponentProps) => {
  const classes = useStyles();
  const redirectHome = () => {
    props.history.push("/characters");
  }

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <Button color="inherit" onClick={redirectHome} className={classes.title}>Star Wars</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Main);
