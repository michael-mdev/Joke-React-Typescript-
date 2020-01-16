import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { Category, Joke, APIResult } from './type'
import JokeCard from './components/JokeCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input_field: {
      margin: 20,
    },  
    button: {
      marginTop: 30,
    },
    footer: {
      top: 'auto',
      bottom: 0,
    },
    header: {
      background: 'white',
    },
    cardlist: {
      paddingTop: 20,
      paddingBottom: 100,
    },
  }),
);


const App: React.FC = () => {
  const classes = useStyles();
  
  const [jokes, setJokes] = useState<Array<Joke>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [query, setQuery] = useState<string>("");

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const getRandomJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then(response => response.json())
      .then((joke: Joke) => setJokes([joke]));
  }

  const getJokeByCategory = (event: object ,value: string) => {
    if (value) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${value}`)
      .then(response => response.json())
      .then((joke: Joke) => setJokes([joke]));
    }
  }
  
  const getJokeByQuery = () => {
    if (query) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
      .then(response => response.json())
      .then((data: APIResult) => setJokes(data.result));
    }
  }

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then(response => response.json())
      .then((categories: Array<Category>) => setCategories(categories));
  }, []);

  return (
    <>
      <AppBar position="sticky" className={classes.header}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary" onClick={getRandomJoke} className={classes.button}>
                Get A Random Joke 
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="standard-basic" 
                label="Query"
                variant="outlined"
                onChange = { changeQuery }
                className={classes.input_field}
              />
              <Button variant="contained" color="primary" onClick={getJokeByQuery} className={classes.button}>
                Search 
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                id="combo-box-demo"
                className={classes.input_field}
                options={categories}
                onChange = {getJokeByCategory}
                getOptionLabel={option => option}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Categories" variant="outlined" fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      <Container className={classes.cardlist}>
        <Grid container spacing={3}>
        { 
          jokes.map( (ele: Joke) => (
            <Grid key={ele.id} item xs={12} sm={3}>
              <JokeCard
                key = { ele.id }
                joke = { ele }
              />
            </Grid>
          ))
        }
        </Grid>
      </Container>
      <AppBar position="fixed" className={classes.footer}>
          <Toolbar>
            <Typography variant="h6">
              Christian Heranndez
            </Typography>
          </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
