const db = require('../connection/db');
const signup = require('../connection/signup');
const signin = require('../connection/signin');
const getUser = require('../connection/user');

const uploadController = require("../connection/uploadDB");
const upload = require("../connection/upload");

const getGroup = require('../connection/group');
const getExpenses = require('../connection/expenses');
const getActivity = require('../connection/activity');

var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/user_pic", express.static("public/user"));
app.use("/group_pic", express.static("public/group"));

// simple route
app.get('/dashboard/:id',function(req,res){
  console.log("inside dashboard testing...");
  var temp = new getUser();
  temp.getDashboardInfo(db, req, res);
  // res.status(200).json(
  //       "hello hello"
  //   );
})

app.post("/signup", function(req, res) {
  // console.log("Req Body updated : ", req.body, res.body);
  var temp = new signup();
  temp.register(db, req, res);
});


app.post("/signin", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new signin();
  temp.login(db, req, res);
});

app.post("/getUser", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getUser();
  temp.getUser(db, req, res);
});

app.post("/accpet", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getGroup();
  temp.accpet(db, req, res);
});

app.post("/reject", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getGroup();
  temp.reject(db, req, res);
});

app.post("/searchUser", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getUser();
  temp.allUser(db, req, res);
});

app.get("/searchUser", function(req, res) {
  console.log("searchUser Req Body : ", req.body);
  var temp = new getUser();
  temp.allUser(db, req, res);
});

app.post("/getGroup", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getGroup();
  temp.getGroup(db, req, res);
});

app.post("/allGroup", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getGroup();
  temp.allGroup(db, req, res);
});

app.post("/leaveGroup", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getGroup();
  temp.leaveGroup(db, req, res);
});

app.post("/addExpenses", function(req, res) {
  // console.log("Req Body : ", req.body);
  var temp = new getExpenses();
  temp.addExpense(db, req, res);
});

app.post('/expense/:ID', function (req, res) {
  // console.log("Expense Req Body: ", req.body);
  var temp = new getExpenses();
  temp.getExpense(db, req, res);
});

app.post('/getInfo', function (req, res) {
  console.log("!Expense Req Body!: ", req.body);
  var temp = new getExpenses();
  temp.getUserInfo(db, req, res);
});

app.post('/getOweInfo', function (req, res) {
  console.log("Expense Req Body: ", req.body);
  var temp = new getExpenses();
  temp.getUserOweInfo(db, req, res);
});

app.post('/updateExpenses', function (req, res) {
  console.log("Expense Req Body: ", req.body);
  var temp = new getExpenses();
  temp.updateExpenses(db, req, res);
});

app.post('/allActivity', function (req, res) {
  console.log("Expense Req Body: ", req.body);
  var temp = new getActivity();
  temp.allActivity(db, req, res);
});

app.post('/calculate', function (req, res) {
  console.log("Expense Req Body: ", req.body);
  var temp = new getExpenses();
  temp.calculate(db, req, res);
});

app.post('/recent', function (req, res) {
  console.log("Recent Req Body: ", req.body);
  var temp = new getGroup();
  temp.recent(db, req, res);
});

// app.post("/createGroup", upload.fields([{ name: 'picture'}]), uploadGroup.createGroup);

app.post("/update", upload.fields([{ name: 'picture'}]), uploadController.uploadFiles);

// set port, listen for requests
app.listen(9000, () => {
  console.log("Server is running on port 9000.");
});