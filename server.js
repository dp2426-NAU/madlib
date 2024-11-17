const express = require('express');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route to serve index.html at the root URL
server.get('/', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'ITC505', 'lab-7', 'index.html')); // Serve the index.html file
});

// Random number endpoint
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Submission endpoint
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, pluralNoun } = req.body;
  if (!noun || !verb || !adjective || !place || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }
  const madLib = `One day, a great challenge arose in the land of [place]. The [pluralNoun] were disappearing! It was up to the brave [noun] to save the day. Armed with its trusty [adjective] courage, the [noun] set out on an adventure like no other.`;
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Set port based on command line argument
let port = 80;
if (process.argv[2] === 'local') {
  port = 8081;
}
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/ITC505/lab-7/index.html`);
});
