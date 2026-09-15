let express = require("express");
let app = express();
app.use(express.json());
let cors = require("cors");
app.use(cors());
require("dotenv").config();
let { createClient } = require("@supabase/supabase-js");
let supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

app.get("/readteachers", async (req, res) => {
  let { data, error } = await supabase.from("teach").select("*");
  if (data && data.length > 0) {
    res.json(data);
  } else {
    res.send({ status: "read teacher failed" });
  }
});

app.post("/addteachers", async (req, res) => {
  let { name, age, salary, education } = req.body;
  let { data, error } = await supabase.from("teach").insert({ name: name, age: age, salary: salary, education: education }).select();
  if (data && data.length > 0) {
    res.send("teacher added");
  } else {
    res.send("teacher added failed");
  }
});

app.post("/deleteteachers", async (req, res) => {
  let id = req.body.id;
  let { data, error } = await supabase.from("teach").delete().select().eq("id", id);
  if (data && data.length > 0) {
    res.send("teachers delete");
  } else {
    res.send("teacher delete failed");
  }
});

app.post("/readsingleteacher", async (req, res) => {
  let id = req.body.id;
  let { data, error } = await supabase.from("teach").select().eq("id", id);
  if (data && data.length > 0) {
    res.json(data);
  } else {
    res.send({ status: "read teacher failed" });
  }
});

app.post("/updateteachers", async (req, res) => {
  let { name, age, salary, education, id } = req.body;
  let { data, error } = await supabase.from("teach").update({ name: name, age: age, salary: salary, education: education }).eq("id", id).select();
  if (data && data.length > 0) {
    res.send("teacher updated");
  } else {
    res.send("teacher updated failed");
  }
});

module.exports = app;