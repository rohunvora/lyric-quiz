let blonde = document.getElementById("blonde");
let dieLit= document.getElementById("dieLit");
let darkLaneDemoTapes = document.getElementById("darkLaneDemoTapes");
let startQuiz = document.getElementById("startQuiz")
const inputBar = document.createElement("input")
const submitButton = document.createElement("input")
let blondeQuiz = document.querySelector("#quizOne");
let blondeURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=114244840&apikey="

inputBar.setAttribute("type", "text");
submitButton.setAttribute("type", "submit");

console.log(inputBar);


startQuiz.onclick = function generateQuiz() {
  if (blonde.checked == true) {
    let tempQuestion = getQuestion(blondeURL);
    document.getElementById("quizOne").style.display = "block";


  } else if (dieLit.checked == true) {
    document.getElementById("quizTwo").style.display = "block";
  } else if (darkLaneDemoTapes.checked == true) {
    document.getElementById("quizThree").style.display = "block";
  }
};

function answerOne() {
  console.log(inputBar.value)
}

submitButton.onclick = function() {
  answerOne();
}

function getQuestion(url) {
  fetch(url)
  .then(response => {
    console.log(response)
    return response.json()
  })
  .then (data => {
    let lyricBody = data.message.body.lyrics.lyrics_body;
    let arrayOfLines = lyricBody.split(/\r?\n/);
    let randomIndex = arrayOfLines[3];
    //math.random()
    let splitRandomIndex = randomIndex.split(" ");
    splitRandomIndex[4] = " ________ ";
    let finalQuestion = splitRandomIndex.join(" ");
    let questionElement = document.createElement("p");
    questionElement.innerText = finalQuestion;
    blondeQuiz.appendChild(questionElement)
    blondeQuiz.appendChild(inputBar);
    blondeQuiz.appendChild(submitButton);
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
