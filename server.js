const express = require("express");
const app = express();

const port = 3000;
let id = 1;

let data = [
  {
    id: 1,
    task: "Task-1",
    dsc: "Developing App",
  },
];

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/insert", (req, res) => {
  let AddData = {
    id: id++, 
    task: req.body.task,
    dsc: req.body.dsc,
  };

  data.push(AddData);
  console.log(AddData);
  return res.redirect("back");
});

app.get("/edit", (req, res) => {
  if (req.query.id) {
    let editData = data.find((task) => task.id == req.query.id)
    res.render("edit", { editData: editData });
  }
});

app.get("/delete", (req, res) => {
  data = data.filter((val) => val.id != req.query.id);
  return res.redirect("back");
});

app.post("/edit", (req, res) => {
  let editId = req.body.id;
console.log(editId);
  let EditData = data.filter((val) => {
    if (val.id == editId) {
      val.task = req.body.task;
      val.dsc = req.body.dsc;
    }
    return val;
  });

  data = EditData;
  res.redirect("/");
});

app.get("/show", (req, res) => {
  return res.render("table", {
    data: data,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});
