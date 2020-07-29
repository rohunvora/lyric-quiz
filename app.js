let blonde = document.getElementById("blonde");
let dieLit= document.getElementById("dieLit");
let darkLaneDemoTapes = document.getElementById("darkLaneDemoTapes");
let blondeAlbumURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=23915006&page=1&page_size=17&apikey="
let fullAlbumArray = [];
let blondeTracksURL = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=23915006&page=1&page_size=17&apikey='
let startQuiz = document.getElementById("startQuiz")
const inputBar = document.createElement("input")
const submitButton = document.createElement("input")
inputBar.setAttribute("type", "text");
submitButton.setAttribute("type", "submit");
let blondeQuiz = document.querySelector("#quizOne");
let nikesNumber = 114244840;
let dieLitQuiz = document.querySelector("#quizTwo");
let dieLitURL = "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=149944932&apikey="
let rightAnswer
let scoreBox = document.getElementById("scorebox");
let score = document.createElement("h1");
scoreBox.appendChild(score);
score.innerText = 0;
let updatedScore = 0;
let gameActive = false;
let lyricArray = [];



    // }

// lyric quiz
// start screen describing how the quiz works
// function that allows users to search an artist
// allows users to pick an artist
// allow users to pick an album
startQuiz.onclick = async function generateQuiz() {
  // turn game to active
  gameActive = true;
  // check which album it is
  if (blonde.checked == true) {
    lyricArray = [];
    getAlbumArray(blondeTracksURL).then(resultArray => {
      for (let i=0; i<resultArray.length; i++) {
        let eachTrackID = resultArray[i];
        let eachTrackURL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${eachTrackID}&apikey=`
        fetch(eachTrackURL)
          .then(response => {
            return response.json()
          })
          .then(data => {
            let lyricBody = data.message.body.lyrics.lyrics_body;
            lyricArray.push(lyricBody)
          })
      }
     console.log(lyricArray);
    })


    submitButton.onclick = checkAnswer
    document.getElementById("quizOne").style.display = "block";
  } else if (dieLit.checked == true) {
    let tempQuestion = getQuestion(dieLitURL, dieLitQuiz);
    document.getElementById("quizTwo").style.display = "block";

  } else if (darkLaneDemoTapes.checked == true) {
    document.getElementById("quizThree").style.display = "block";
  }
};

// create array of track ID's
async function getAlbumArray(url) {
  let res = await fetch(url)
  .then(response => {
    console.log(response)
    return response.json()
  })
  let fullAlbumArray = [];
    let trackList = res.message.body.track_list;
    for (let i = 0; i < trackList.length; i++) {
      let trackID = trackList[i].track.track_id;
      fullAlbumArray.push(trackID);
    }
    return (fullAlbumArray);
};

// getAlbumArray(blondeTracksURL).then(resultArray => {
//   console.log(resultArray);
// });



// fetch lyrics from API
function getQuestion(array) {
      let lyricBody = array[0];
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
    }
// checking if the user matches the lyrics

function checkAnswer() {
  if (inputBar.value == rightAnswer) {
    console.log("You are correct")
    scoreTracker();
    clearQuestion();
    loadNewQuestion();
    getQuestion();
  } else {
    console.log("Sorry the actual lyric was: " + rightAnswer)
    clearQuestion();
    loadNewQuestion();
    getQuestion();
  }
};
// if match add to the score if not don't add to the score
const scoreTracker = () => {
  updatedScore += 1;
  score.innerText = updatedScore;
}

// clear current question
const clearQuestion = ()  => {
    document.getElementById("tempQ").innerText = "";
    document.getElementById("tempPrev").innerText = "";
    document.getElementById("tempPost").innerText = "";
    inputBar.value = "";

}

const loadNewQuestion = () => {
  let newTrackID = resultarray.shift()
}
// move on to the next question (total questions = number of tracks)

// give the user a final score out of the number of tracks
// allow them to restart the game (clear everything out)












//select random index from the array
// split the array by spaces into a new array
// select a random index to replace with _________
// return a string


// https://api.musixmatch.com/ws/1.1/
// frank ocean artist id: 13928405
// frank ocean blonde album id: 23915006
// blonde track list fetch url "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=23915006&page=1&page_size=17&apikey="
// nikes track id: 114244840

    // yourScore = yourScore + 1;

// let yourScore = 0;
// let yourScoreDisplay = document.createElement("h1")
// blondeQuiz.appendChild(yourScoreDisplay);
