// Define Elements and Variables for Gameplay
let startQuiz = document.getElementById("startQuiz");
const inputBar = document.createElement("input");
const submitButton = document.createElement("input");
inputBar.setAttribute("type", "text");
submitButton.setAttribute("type", "submit");
let quizBlock = document.getElementById("quiz");
let rightAnswer;
let scoreBox = document.getElementById("scorebox");
let score = document.createElement("h1");
let questionsCount = document.createElement("p");
scoreBox.appendChild(score);
score.innerText = "Your Score: \n" + 0;
let updatedScore = 0;
let gameActive = false;
let prevRightAnswer = document.createElement("p");
prevRightAnswer.setAttribute("id", "prevAnswer");
prevRightAnswer.style.color = "red";

//Declare Elements and Variables for Acquiring the Album Data from the User

let docTop = document.getElementById("top");
const searchBar = document.getElementById("searchTerm");
let searchSubmit = document.getElementById("search");
let searchHeader = document.getElementById("heading");
let searchAlbum = document.getElementById("searchTwo");

// Global Variables
let fullAlbumArray = [];
let lyricArray = [];
let finalLyricArray = [];

let tempAlbumID;
let tempURL;

let punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";


// Fetch with the Album ID to Create an Array of Track ID's
async function getAlbumArray(url) {
  let res = await fetch(url).then((response) => {
    return response.json();
  });
  console.log(res);
  let fullAlbumArray = [];
  let trackList = res.message.body.track_list;
  console.log("this is tracklist: ", trackList);
  for (let i = 0; i < trackList.length; i++) {
    if (trackList[i].track.has_lyrics == 1) {
      let trackID = trackList[i].track.track_id;
      fullAlbumArray.push(trackID);
    }
  }
  return fullAlbumArray;
}

// Once the user types in an artist, we fetch that string from the API and return the first artist that matches that query.
searchSubmit.onclick = function pullArtistId() {
  fetch(
    `https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${searchBar.value}&apikey=b9be9239c6a2488ed6e77853bede6d78`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      let artistID = data.message.body.artist_list[0].artist.artist_id;
      fetchAlbums(artistID);
    });
};

// We use the Artist ID to pull an array of albums that the artist has made.
function fetchAlbums(artistID) {
  fetch(
    `https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistID}&page=1&page_size=100&g_album_name=1&apikey=48544aa4f2a8481d9aea9574bdd42157`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      searchHeader.innerText = "Now, Search the Album";
      searchBar.value = "";
      searchSubmit.style.display = "none";
      searchAlbum.style.display = "block";

      let albumList = data.message.body.album_list;

      // User Searches the Album within our Album Array

      searchAlbum.onclick = function getAlbum(album) {
        let matchingAlbum = albumList.filter((album) => {
          return (
            album.album.album_name.toLowerCase() ==
            searchBar.value.toLowerCase()
          );
        });
        tempAlbumID = matchingAlbum[0].album.album_id;
        console.log(tempAlbumID);
        tempURL = `https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${tempAlbumID}&page=1&page_size=17&apikey=b9be9239c6a2488ed6e77853bede6d78`;
        searchAlbum.style.display = "none";
        searchBar.style.display = "none";
        startQuiz.style.display = "block";
      };
    });
}
// Generate the Quiz
startQuiz.onclick = function generateQuiz() {
  document.getElementById("top").style.display = "none";
  document.getElementById("scoreBoxContainer").style.display = "flex";

  gameActive = true;
  lyricArray = [];
  finalLyricArray = [];
  console.log("This is the tempURL: ", tempURL);

  // Iterate through the Album Array to Get the Lyrics for Each Track
  getAlbumArray(tempURL)
    .then(async function (resultArray) {
      for (let i = 0; i < resultArray.length; i++) {
        let eachTrackID = resultArray[i];
        let eachTrackURL = `https://pacific-atoll-34074.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${eachTrackID}&apikey=b9be9239c6a2488ed6e77853bede6d78`;
        await fetch(eachTrackURL)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let lyricBody = data.message.body.lyrics.lyrics_body;
            var rawLetters = lyricBody.split("");
            var cleanLetters = rawLetters.filter(letter => {
              return punctuation.indexOf(letter) === -1;
            });
            var cleanString = cleanLetters.join("");
            lyricArray.push(cleanString);
          });
      }
      return lyricArray;
    })
    .then((data) => {
      // Get the Question
      getQuestion(data);
      let questionsAnswered = 0;
      let totalQuestions = data.length;

      //Check Answers
      submitButton.onclick = function checkAnswer() {
        prevRightAnswer.innerText = ""
        questionsAnswered += 1;
        questionsCount.innerText = questionsAnswered + " / " + totalQuestions;
        scoreBox.appendChild(questionsCount);
        if (inputBar.value == rightAnswer) {
          console.log("You are correct");
          scoreTracker();
          if (questionsAnswered === data.length) {
            gameActive = false;
            isGameOver();
          } else {
            clearQuestion();
            getQuestion(data);
          }
        } else {
          if (questionsAnswered === data.length) {
            gameActive = false;
            isGameOver();
          } else {
            console.log("Sorry the actual lyric was: " + rightAnswer);
            prevRightAnswer.innerText = "Sorry, the right answer was: \n" + rightAnswer;
            scoreBox.appendChild(prevRightAnswer);
            clearQuestion();
            getQuestion(data);
          }
        }
      };
    });
  document.getElementById("quiz").style.display = "block";
};

// Create the Question
function getQuestion(array) {
  let randArrayNum = Math.floor(Math.random() * array.length);
  let lyricBody = array[randArrayNum];
  let arrayOfLines = lyricBody.split(/\r?\n/);
  arrayOfLines.pop();
  arrayOfLines.pop();
  arrayOfLines.pop();
  let randMax = arrayOfLines.length;
  let randNum = Math.floor(Math.random() * randMax);
  let randomIndex = arrayOfLines[randNum];
  if (randomIndex === ""){
    arrayOfLines.splice(randNum);
    let tempRandNum = Math.floor(Math.random() * randMax - 1);
    randomIndex = arrayOfLines[tempRandNum];
    console.log(randomIndex)
    let previousLine = arrayOfLines[tempRandNum - 1];
    let postLine = arrayOfLines[tempRandNum + 1];
    let splitRandomIndex = randomIndex.split(" ");
    let randTwoMax = splitRandomIndex.length;
    let randNumTwo = Math.floor(Math.random() * randTwoMax);
    rightAnswer = splitRandomIndex[randNumTwo];
    splitRandomIndex[randNumTwo] = " ________ ";
    let finalQuestion = splitRandomIndex.join(" ");
    let questionElement = document.createElement("p");
    questionElement.setAttribute("id", "tempQ");
    let previousLineElement = document.createElement("p");
    previousLineElement.setAttribute("id", "tempPrev");
    let postLineElement = document.createElement("p");
    postLineElement.setAttribute("id", "tempPost");
    if (previousLine != undefined) {
      previousLineElement.innerText = previousLine;
    }
    if (postLine != undefined) {
      postLineElement.innerText = postLine;
    }
    questionElement.innerText = finalQuestion;
    quizBlock.appendChild(previousLineElement);
    quizBlock.appendChild(questionElement);
    quizBlock.appendChild(postLineElement);
    quizBlock.appendChild(inputBar);
    quizBlock.appendChild(submitButton);
  } else {
      let previousLine = arrayOfLines[randNum - 1];
      let postLine = arrayOfLines[randNum + 1];
      let splitRandomIndex = randomIndex.split(" ");
      let randTwoMax = splitRandomIndex.length;
      let randNumTwo = Math.floor(Math.random() * randTwoMax);
      rightAnswer = splitRandomIndex[randNumTwo];
      splitRandomIndex[randNumTwo] = " ________ ";
      let finalQuestion = splitRandomIndex.join(" ");
      let questionElement = document.createElement("p");
      questionElement.setAttribute("id", "tempQ");
      let previousLineElement = document.createElement("p");
      previousLineElement.setAttribute("id", "tempPrev");
      let postLineElement = document.createElement("p");
      postLineElement.setAttribute("id", "tempPost");
      if (previousLine != undefined) {
        previousLineElement.innerText = previousLine;
      }
      if (postLine != undefined) {
        postLineElement.innerText = postLine;
      }
      questionElement.innerText = finalQuestion;
      quizBlock.appendChild(previousLineElement);
      quizBlock.appendChild(questionElement);
      quizBlock.appendChild(postLineElement);
      quizBlock.appendChild(inputBar);
      quizBlock.appendChild(submitButton);
  }
}

const scoreTracker = () => {
  updatedScore += 1;
  score.innerText = "Your Score: \n" + updatedScore;
};

const clearQuestion = () => {
  document.getElementById("tempQ").remove();
  document.getElementById("tempPrev").remove();
  document.getElementById("tempPost").remove();
  inputBar.value = "";
};

const isGameOver = () => {
  if (gameActive === false) {
    document.getElementById("container-two").style.display = "none";
    score.innerText = "Your Final Score: \n" + updatedScore;
  }
};
