import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Avatar, Card, IconButton, CardContent, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

import { Joke } from '../type'

type JokeCardProps = {
    joke: Joke;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      height: '100%',
      position: 'relative'
    },
    link_button: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    content_text: {
        marginTop: 20,
        paddingBottom: 20
    }
  }),
);

const JokeCard: React.FC<JokeCardProps>  = (props: JokeCardProps) => {
    const { joke } = props;
    const classes = useStyles();

    const getCone = () => window.open(joke.url, '_blank');

    return (
        <Card className={classes.card}>
            <CardContent>
                <Avatar variant="square" src={joke.icon_url}>
                </Avatar>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.content_text}>
                    {joke.value}
                </Typography>
                <IconButton aria-label="share" className={classes.link_button} onClick={getCone}>
                    <ShareIcon />
                </IconButton>
            </CardContent>
        </Card>
    )
}

export default JokeCard;