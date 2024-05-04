const assert = require('assert');
const axios = require('axios')
const request = require('request')
const expect = require("chai").expect
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = 'http://localhost:9000';

describe("returns user", function(){
    it('returns user', function(done){
        request.get({url:'http://localhost:9000/searchUser'},
        function(error, response, body){
                // console.log("response",response);
                expect(response.statusCode).to.equal(200)
            done();
        })
    })
})

describe("check for duplicate username", function(done){
    it("get The error from duplicate username in signup", function(done) {
        // Send some Form Data
            chai.request(app)
        .post('/signup')
        .send({username: "renee02", psswd: "123"})
        .end(function (err, res) {
            expect(res.statusCode).to.equal(400)
            expect(res.body.msg).to.equal('Username already exists, please try another one')
        done();
        });
    })
})

describe("check for duplicate email", function(done){
    it("get The error from duplicate email in signup", function(done) {
        // Send some Form Data
            chai.request(app)
        .post('/signup')
        .send({username: "chen02", psswd: "123", email:"123@gmail.com"})
        .end(function (err, res) {
            expect(res.statusCode).to.equal(400)
            expect(res.body.msg).to.equal('Email already exists, please try another one')
        done();
        });
    })
})

describe("accept invitation from group", function(done){
    it("accept invitation from group in dashboard", function(done) {
        // Send some Form Data
            chai.request(app)
        .post('/accpet')
        .send({name: "Group 3", user:18})
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200)
            expect(res.body.msg).to.equal('Accept invitation successfully')
        done();
        });
    })
})

describe("get all recent activity ", function(done){
    it("accept invitation from group in dashboard", function(done) {
        // Send some Form Data
            chai.request(app)
        .post('/expense/74')
        .end(function (err, res) {
            expect(res.statusCode).to.equal(200)
            expect(res.body.msg).to.equal('Done with getting all expense')
        done();
        });
    })
})


