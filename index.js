const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Node.js Docker App</title>
      <style>
        body {
          margin: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0f0f0f;
          font-family: Arial, sans-serif;
        }

        .glow-box {
          padding: 40px 60px;
          font-size: 2.5rem;
          text-align: center;
          color: #fff;
          border-radius: 15px;
          background: #111;
          box-shadow: 0 0 20px #f00, 0 0 30px #0f0, 0 0 40px #00f;
          animation: glow 4s linear infinite;
        }

        @keyframes glow {
          0%   { box-shadow: 0 0 10px #f00, 0 0 20px #0f0, 0 0 30px #00f; }
          25%  { box-shadow: 0 0 20px #0ff, 0 0 30px #ff0, 0 0 40px #f0f; }
          50%  { box-shadow: 0 0 30px #00f, 0 0 40px #f00, 0 0 50px #0f0; }
          75%  { box-shadow: 0 0 20px #ff0, 0 0 30px #0ff, 0 0 40px #f0f; }
          100% { box-shadow: 0 0 10px #f00, 0 0 20px #0f0, 0 0 30px #00f; }
        }
      </style>
    </head>
    <body>
      <div class="glow-box">
        Hello from Node.js Docker App!
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(\`App running on port \${port}\`);
});
