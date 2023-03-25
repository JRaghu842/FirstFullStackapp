let express = require("express");
let app = express();
let cors = require("cors");
require("dotenv").config();

let { connection } = require("./db");
const { noteRouter } = require("./routes/note.routes");
const { userRouter } = require("./routes/user.routes");
let { auth } = require("./middleware/auth.middleware");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not connected to DB");
    console.log(error);
  }
  console.log(`Server is live at port ${process.env.port}`);
});
