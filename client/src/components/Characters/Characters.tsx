import React from 'react';
import axios from 'axios';
import { pathOr } from 'ramda';
import { Grid, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";
import Main from '../Main/Main';

interface Characters {
  id: string,
  name: string
}

interface Props {
  config: {
    apiUrl: string
  }
}

interface State {
  isFetching: boolean,
  characters: Characters[][],
}

const ListItemLink = (props: any) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={{ pathname: `/details/${props.id}`, state: { id: props.id } }}>
      <ListItem button {...props} />
    </Link>
  );
}

class Characters extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isFetching: false,
      characters: []
    };
  }

  splitToColumns(array: any[]) {
    let result = [];

    if (array.length > 0) {
      for (let i = 3; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
      }
    }
    return result;
  }

  async getCharacters() {
    try {
      this.setState({ isFetching: true });
      const query = 'query { allPeople { people { id, name } }}';

      const response = await axios.post(this.props.config.apiUrl, { query: query });
      const people = pathOr([], ['data', 'data', 'allPeople', 'people'], response);
      this.setState({ characters: this.splitToColumns(people), isFetching: false });
    } catch (error) {
      console.log('Failed to fetch characters API', error);
      this.setState({ isFetching: false });
    }
  }

  componentDidMount() {
    this.getCharacters();
  }

  render() {
    return (
      <div>
        <Main />
        {
          this.state.isFetching ? (
            < CircularProgress className="spinner" />
          ) : (
              <div style={{ marginLeft: "3vw" }}>
                <h2>Characters List</h2>
                <Grid container spacing={0}>
                  {this.state.characters.map(list => {
                    return (
                      <Grid item sm>
                        <List>
                          {list.map(character => {
                            return (
                              <ListItemLink id={character.id}>
                                <ListItemText primary={character.name} />
                              </ListItemLink>
                            );
                          })}
                        </List>
                      </Grid>
                    )
                  })}
                </Grid>
              </div>
            )
        }
      </div>
    )
  }
}

export default Characters;
