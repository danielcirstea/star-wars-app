import React from 'react';
import './Details.css';
import axios from 'axios';
import { pathOr } from 'ramda';
import Main from '../Main/Main';
import { Button, Grid, ListItem, List, CircularProgress } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

interface Film {
  episodeID: number,
  openingCrawl: string,
  title: string,
}

interface State {
  name: string,
  isFetching: boolean,
  films: Film[],
  modalOpen: boolean,
  btnIndex: number,
}

interface Props {
  config: {
    apiUrl: string
  },
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


class Details extends React.Component<Props & RouteComponentProps, State> {


  constructor(props: Props & RouteComponentProps) {
    super(props);
    this.state = {
      name: '',
      isFetching: false,
      films: [],
      modalOpen: false,
      btnIndex: -1,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onButtonClose = this.onButtonClose.bind(this);
    this.onRedirectBack = this.onRedirectBack.bind(this);
  }

  getId(): any {
    const id = pathOr(undefined, ['match', 'params', 'id'], this.props);
    return id;
  }

  async getDetails() {
    const personId = this.getId();

    try {
      this.setState({ isFetching: true });
      const query = `query { person(id: "${personId}" ) { name, filmConnection { films { title,  episodeID,
        openingCrawl } } } }`;
      const response = await axios.post(this.props.config.apiUrl, { query: query });

      console.log('ress', response);
      const name = pathOr('UNKNOWN', ['data', 'data', 'person', 'name'], response);
      const films = pathOr([], ['data', 'data', 'person', 'filmConnection', 'films'], response);

      this.setState({ name: name, films: films, isFetching: false });
    } catch (error) {
      console.log('Failed to fetch characters API', error);
      this.setState({ isFetching: false });
    }
  }

  componentDidMount() {
    this.getDetails();
  }

  onButtonClick(index: number) {
    this.setState({
      modalOpen: true,
      btnIndex: index
    });
  }

  onRedirectBack() {
    this.props.history.push("/characters");
  }

  onButtonClose() {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Main />
        {
          this.state.isFetching ? (
            < CircularProgress className="spinner" />
          ) : (
              <div style={{ marginLeft: "3vw" }}>
                <div className="top--header">
                  <Button className="btn--header" onClick={this.onRedirectBack}>
                    <KeyboardBackspaceIcon style={{ fontSize: '30px' }} />
                  </Button>
                  <h2> {this.state.name}</h2>
                </div>
                <Grid container spacing={0} >
                <Grid item xs>
                  <List>
                    {this.state.films.map((film, i) => {
                      return (
                        <ListItem key={i}>
                          <Button className="btn--details" onClick={() => this.onButtonClick(i)}>
                            {film.title}
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
                  {this.state.modalOpen ?
                    (<div>
                      <Dialog onClose={this.onButtonClose} aria-labelledby="customized-dialog-title" open={this.state.modalOpen}>
                        <DialogTitle id="customized-dialog-title" onClose={this.onButtonClose}>
                          <p style={{ color: "yellow", marginTop: 0 }}>{this.state.name} - Episode {this.state.films[this.state.btnIndex].episodeID}: {this.state.films[this.state.btnIndex].title}</p>
                        </DialogTitle>
                        <DialogContent dividers className="wrapper">
                          <div className="fade"></div>
                          <section className="star-wars">
                            <div className="crawl">
                              <div className="title">
                                <p>Episode {this.state.films[this.state.btnIndex].episodeID}</p>
                                <h1>{this.state.films[this.state.btnIndex].title}</h1>
                              </div>
                              <p>{this.state.films[this.state.btnIndex].openingCrawl}</p>
                            </div>
                          </section>
                        </DialogContent>
                      </Dialog>
                    </div>) :
                    null
                  }
                </Grid>
                </Grid>
              </div>
    )
  }
      </div>
    );
  }
}

export default withRouter(Details);
