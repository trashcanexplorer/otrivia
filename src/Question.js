import React from 'react';
import { Grid, Button } from '@material-ui/core';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.decodeHtml = this.decodeHtml.bind(this);
    this.state = {
      answers: [],
      isCorrect: false,
      answered: false
    }
  }

  decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  checkAnswer(answer) {
    if (answer === this.props.question.correct_answer) {
      this.setState({
        isCorrect: true
      });
      this.props.addScore();
    }

    this.setState({
      answered: true
    });
  }

  componentDidMount() {
    let answers = this.props.question.incorrect_answers;
    answers.push(this.props.question.correct_answer);

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tmp = answers[i];
      answers[i] = answers[j];
      answers[j] = tmp;
    }

    this.setState({
      answers: answers
    });
  }

  render() {
    return(
      <Grid container spacing={3}>
        <Grid item xs={12}>{this.decodeHtml(this.props.question.question)}</Grid>
        {this.state.answers.map((answer, index) =>
          <Grid item sm={6} xs={12}>
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              onClick={() => this.checkAnswer(answer)}
              disabled={this.state.answered ? true : false}
              key={index}
              className={this.state.answered && answer === this.props.question.correct_answer ? "AnswerButton green" : this.state.answered && answer !== this.props.question.correct_answer ? "AnswerButton red" : "AnswerButton"}
            >
              {this.decodeHtml(answer)}
            </Button>
          </Grid>
        )}
        {this.props.index === 9 && this.state.answered ? (
          <Grid item xs={12}>
            <p>Total score: {this.props.score}</p>
            <Button variant="outlined" size="large" color="primary" onClick={this.props.restart}>Start again</Button>
          </Grid>
        ) : this.props.index !== 9 && this.state.answered ? (
          <Grid item xs={12}>
            <Button variant="outlined" size="large" color="primary" onClick={this.props.nextQuestion}>Next question</Button>
          </Grid>
        ) : ""}
      </Grid>
    );
  }
}

export default Question;
