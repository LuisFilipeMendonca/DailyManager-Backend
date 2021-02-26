import express from "express";
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
