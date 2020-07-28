let blonde = document.getElementById("blonde");
let dieLit= document.getElementById("dieLit");
let darkLaneDemoTapes = document.getElementById("darkLaneDemoTapes");
let startQuiz = document.getElementById("startQuiz")
const inputBar = document.createElement("input")
const submitButton = document.createElement("input")
inputBar.setAttribute("type", "text");
submitButton.setAttribute("type", "submit");
let blondeQuiz = document.querySelector("#quizOne");
let blondeURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=114244840&apikey="
let rightAnswer
let questionElement
let previousLineElement
let postLineElement




startQuiz.onclick = function generateQuiz() {
  if (blonde.checked == true) {
      let tempQuestion = getQuestion(blondeURL, blondeQuiz);
      document.getElementById("quizOne").style.display = "block";
      let yourScore = 0;
      let yourScoreDisplay = document.createElement("h1")
      blondeQuiz.appendChild(yourScoreDisplay);

      for (i = 0; i < 10; i++) {
      submitButton.onclick = function checkAnswer() {
        yourScoreDisplay.innerText = "Your Score: " + yourScore;

        if (inputBar.value == rightAnswer && yourScore === 0) {
          yourScore = yourScore + 1;
          document.getElementById("tempQ").style.display = "none";
          document.getElementById("tempPrev").style.display = "none";
          document.getElementById("tempPost").style.display = "none";
          getQuestion(blondeURL, blondeQuiz);
      } else {
          console.log("Sorry the actual lyric was: " + rightAnswer)
        }
      };
    }



  } else if (dieLit.checked == true) {
    document.getElementById("quizTwo").style.display = "block";
  } else if (darkLaneDemoTapes.checked == true) {
    document.getElementById("quizThree").style.display = "block";
  }
};







function getQuestion(url, quiz) {
  fetch(url)
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then (data => {
    let lyricBody = data.message.body.lyrics.lyrics_body;
    let arrayOfLines = lyricBody.split(/\r?\n/);
    arrayOfLines.pop();
    arrayOfLines.pop();
    arrayOfLines.pop();
    let randMax = arrayOfLines.length
    let randNum = Math.floor(Math.random() * randMax);
    let randomIndex = arrayOfLines[randNum];
    let previousLine = arrayOfLines[(randNum - 1)];
    let postLine = arrayOfLines[(randNum + 1)];
    let splitRandomIndex = randomIndex.split(" ");
    let randTwoMax = splitRandomIndex.length;
    let randNumTwo = Math.floor(Math.random() * randTwoMax);
    rightAnswer = splitRandomIndex[randNumTwo];
    splitRandomIndex[randNumTwo] = " ________ ";
    let finalQuestion = splitRandomIndex.join(" ");
    let questionElement = document.createElement("p");
    questionElement.setAttribute("id", "tempQ")
    let previousLineElement = document.createElement("p");
    previousLineElement.setAttribute("id", "tempPrev")
    let postLineElement = document.createElement("p");
    postLineElement.setAttribute("id", "tempPost")
    previousLineElement.innerText = previousLine;
    postLineElement.innerText = postLine;
    questionElement.innerText = finalQuestion;
    quiz.appendChild(previousLineElement);
    quiz.appendChild(questionElement);
    quiz.appendChild(postLineElement);
    quiz.appendChild(inputBar);
    quiz.appendChild(submitButton);
  });
}

//select random index from the array
// split the array by spaces into a new array
// select a random index to replace with _________
// return a string


// https://api.musixmatch.com/ws/1.1/
// frank ocean artist id: 13928405
// frank ocean blonde album id: 23915006
// blonde track list fetch url "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=23915006&page=1&page_size=17&apikey=48544aa4f2a8481d9aea9574bdd42157"
// nikes track id: 114244840
