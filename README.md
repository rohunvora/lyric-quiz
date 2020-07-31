# Lyric-Quiz
A trivia game to guess the lyrics of your favorite artist. You can search any artist in the world, then search an album, and it will generate a random quiz of the songs in that album.

# Declare Gameplay Variables
Here are all the elements that will allow us to manipulate the DOM as the player plays the game.

# Declare the Input Fields
This is where we create the elements needed to allow the user to search an artist and album name.

# Fetch with Album ID to Create Array of Track ID's
Here we use an async function to fetch the track ID and then iterate through each track in the array and return an array with just the track ID's.

# Pull the Artist ID
Once the user types in an artist, we fetch that string from the API and get the first artist that matches that query. We then return the Artist ID for that artist.

# Pull the Albums the Artist Made
We use the Artist ID to pull an array of albums that the artist has made.

# Search for the Album within the Album Array
Since the list of albums most prolific artists have made are extremely long, it does not make sense to show all the albums. Instead we just allow for the users to search the album and check for a matching string in our existing array.

# Generate the Quiz
The first half of this function creates all of the DOM Elements and sets the variables.

# Get Lyrics
We take the album array and then iterate through it and run a fetch call in a for loop to grab the lyrics for each of the album arrays.

# Check Answers
This will check if the answers between the user input and the logged correct answer are the same.

# Create The Question
First, we pass in a large string called Lyric Body. This is a paragraph of text with the lyrics from the song. First, we split the paragraph into an array by line. Then we create a random number and index the array with the random number. Now we have a single line. We then split that string into an array divided by each word. Then we create another random number and select a random index from this array. This will be our correct answer. Then we create the DOM for the question line and we add the prevous and next line to make it easier to guess.
