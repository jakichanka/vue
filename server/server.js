const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
// const path = require("path");

const app = express();

app.use(cors());
app.options("*", cors());

app.set("port", 3000);

mongoose
  .connect(
    "mongodb+srv://evgeny:qwerty123@cluster0-oxkxh.mongodb.net/todos?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(
    () => console.log("[OK] DB is connected"),
    err => console.error(err)
  );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/records", require("./routes/records"));

// app.use("/", express.static(path.join(__dirname, "../dist")));

app.listen(app.get("port"), () => {
  console.log(`[OK] Server is running on localhost:${app.get("port")}`);
});
