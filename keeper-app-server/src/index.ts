import express from "express";
import cors from "cors";

const app = express();
import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "notes",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(express.json());
app.use(cors());




 
app.get("/notes", async (req, res) => {
    const notes = await db.query("SELECT * FROM note");
    res.json(notes.rows);
});

app.get("/api/notes", async (req, res) => {
  res.json({ message: "success!" });
});

app.post("/api/notes", async (req, res) => {
    const {title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).send("title and content fields required");
    }
    try {
      const note = await db.query("INSERT INTO note (title,content) VALUES ($1,$2)", [title,content]);
      res.json(note.rows);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
});

app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id);
  
    if (!title || !content) {
      return res.status(400).send("title and content fields required");
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send("ID must be a valid number");
    }
  
    try {
      const updatedNote = await db.query("UPDATE note SET title = $1,content = $2 WHERE id = $3",[title,content,id] );
      res.json(updatedNote);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
  });

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
       
        return res.status(400).send("ID field required");
    }

    try {
       
        await db.query("DELETE FROM note WHERE id=$1", [id]);
        res.status(204).send();

    } catch (error) {
        res.status(500).send("Oops, something went wrong");
    }
});




app.listen(4000, () => {
  console.log("server running on localhost:4000");
});