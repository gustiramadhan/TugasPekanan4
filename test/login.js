const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require('dotenv').config()

chai.use(chaiHttp)

const api = chai.request(process.env.BASE_URL)

/////User Login//////
describe("Test User Login", function(){
    it ("Success Login", function(done){
        api.post("/authentications")
        .set('Content-Type', 'Application/json')
        .send({
            email: 'gustiramadhan57@gmail.com',
            password: '123456789'
        })
        .end(function(error, response){
            // expect(response.status).to.equals(201)
            expect(response.body.data.accessToken).to.not.be.null;
            global.token = response.body.data.accessToken;
            //console.log(response.body.data.accessToken)
            done();
        })
    })
})

/////Add Category/////
describe("Add Category", function(){
    it ("Success Add Category", function(done){
        api.post("/categories")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send({
            name: 'makanan ringan',
            description: 'makanan ringan tradisional'
        })
        .end(function(error, response){
            expect(response.status).to.equals(201)
            expect(response.body.data).to.not.be.null;
            global.categoryIds = response.body.data.categoryId;
            //console.log(response.body)
            done();
        })
    })
    it ("Failed Add Category. 'name' Cannot be empty", function(done){
        api.post("/categories")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send({
            name: '',
            description: 'makanan ringan tradisional'
        })
        .end(function(error, response){
            expect(response.status).to.equals(400)

            done();
        })
    })

})

///Get Category/////
describe("Get Category", function(){
    it ("Success Get Category", function(done){
        api.get("/categories/" + global.categoryIds)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)

        .end(function(error, response){
            expect(response.status).to.equals(200)
            expect(global.categoryIds).to.not.be.null;
            // console.log(response.body)
            done();
        })
    })
    it ("Failed to get Category. Category ID not found", function(done){
        api.get("/categories/undefined")
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)

        .end(function(error, response){
            expect(response.status).to.equals(404)
            done();
        })
    })
})


/////Update Category/////
describe("Update Category", function(){
    it ("Success Update Category", function(done){
        api.put("/categories/" + global.categoryIds)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send({
            name: 'Minuman',
            description: 'Minuman tradisional'
        })
        .end(function(error, response){
            expect(response.status).to.equals(200)
            done();
        })
    })

    it ("Failed Update Category. 'name' Cannot be empty", function(done){
        api.put("/categories/" + global.categoryIds)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)
        .send({
            name: '',
            description: 'Makanan Ringan'
        })
        .end(function(error, response){
            expect(response.status).to.equals(400)
            // console.log(response.body)
            done();
        })
    })
})


// ///Delete Category/////
describe("Delete Category", function(){
    it ("Success Delete Category", function(done){
        api.delete("/categories/" + global.categoryIds)
        .set('Content-Type', 'Application/json')
        .set('Authorization', 'Bearer ' + global.token)

        .end(function(error, response){
            expect(response.status).to.equals(200)
            // console.log(response.body)
            done();
        })
    })
    it ("Failed Delete Category. Request does not contain the authorization header", function(done){
        api.delete("/categories/" + global.categoryIds)
        .set('Content-Type', 'Application/json')

        .end(function(error, response){
            expect(response.status).to.equals(401)
            done();
        })
    })

})