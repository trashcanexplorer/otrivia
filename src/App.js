import React from 'react';
import { Container, Grid, FormControl, InputLabel, Select, Button } from '@material-ui/core';
import Question from './Question';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.restart = this.restart.bind(this);
    this.addScore = this.addScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      category: '',
      difficulty: '',
      score: 0,
      currentQuestion: 0,
      questions: null,
      isError: false
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  fetchData(event) {
    event.preventDefault();
    let apiUrl = 'https://opentdb.com/api.php?amount=10';
    if (this.state.category !== "any") {
      apiUrl += '&category=' + this.state.category;
    }
    if (this.state.difficulty !== "any") {
      apiUrl +=  '&difficulty=' + this.state.difficulty;
    }
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            questions: result.results
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            isError: true
          });
        }
      )
  }

  addScore() {
    let score = this.state.score;
    score++;
    this.setState({
      score: score
    });
  }

  nextQuestion() {
    let currentQuestion = this.state.currentQuestion;
    currentQuestion++;
    this.setState({
      currentQuestion: currentQuestion
    });
  }

  restart(event) {
    event.preventDefault();
    this.setState({
      category: '',
      difficulty: '',
      score: 0,
      questions: null,
      currentQuestion: 0
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>OTrivia</h1>
        </header>
        <main>
          {this.state.questions ? (
            <Container maxWidth="sm">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <p>{this.state.currentQuestion + 1}/10</p>
                  <p>Current score: {this.state.score}</p>
                </Grid>
                {this.state.questions.map((question, index) =>
                  <Grid
                    item xs={12}
                    key={index}
                    className={this.state.currentQuestion === index ? "Question current" : "Question"}
                  >
                    <Question question={question} score={this.state.score} addScore={this.addScore} nextQuestion={this.nextQuestion} restart={this.restart} index={index} />
                  </Grid>
                )}
              </Grid>
            </Container>
          ) : this.state.isError === true ? (
            <Container maxWidth="sm">
              Error connecting to database.
            </Container>
          ) : (
            <Container maxWidth="sm">
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl>
                      <InputLabel htmlFor="category">Category</InputLabel>
                      <Select
                        value={this.state.category}
                        defaultValue='any'
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'category',
                          id: 'category'
                        }}
                      >
                        <option value={"any"}>Any Category</option>
                        <option value={"9"}>General Knowledge</option>
                        <option value={"10"}>Entertainment: Books</option>
                        <option value={"11"}>Entertainment: Film</option>
                        <option value={"12"}>Entertainment: Music</option>
                        <option value={"13"}>Entertainment: Musicals &amp; Theatres</option>
                        <option value={"14"}>Entertainment: Television</option>
                        <option value={"15"}>Entertainment: Video Games</option>
                        <option value={"16"}>Entertainment: Board Games</option>
                        <option value={"17"}>Science &amp; Nature</option>
                        <option value={"18"}>Science: Computers</option>
                        <option value={"19"}>Science: Mathematics</option>
                        <option value={"20"}>Mythology</option>
                        <option value={"21"}>Sports</option>
                        <option value={"22"}>Geography</option>
                        <option value={"23"}>History</option>
                        <option value={"24"}>Politics</option>
                        <option value={"25"}>Art</option>
                        <option value={"26"}>Celebrities</option>
                        <option value={"27"}>Animals</option>
                        <option value={"28"}>Vehicles</option>
                        <option value={"29"}>Entertainment: Comics</option>
                        <option value={"30"}>Science: Gadgets</option>
                        <option value={"31"}>Entertainment: Japanese Anime &amp; Manga</option>
                        <option value={"32"}>Entertainment: Cartoon &amp; Animations</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
                      <Select
                        value={this.state.difficulty}
                        defaultValue='any'
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'difficulty',
                          id: 'difficulty'
                        }}
                      >
                        <option value={"any"}>Any Difficulty</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" size="large" color="primary" onClick={this.fetchData}>Start</Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          )}
        </main>
      </div>
    );
  }
}

export default App;
