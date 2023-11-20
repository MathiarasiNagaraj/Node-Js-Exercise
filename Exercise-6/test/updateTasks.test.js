const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);

const ValidTask = {
    "title": "Coding",
       "description":"Coding practice",
       "priority": "high",
       "dueDate": "12/5/2023",
       "comments":["C++","Java","DSA"]
}
const InvalidTask = {

    "description":"Coding practice",
    "priority": "high",
    "dueDate": "12/5/2023",
    "comments":["C++","Java","DSA"]
   }
describe("update task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDQzMzg4LCJleHAiOjE3MDA0NDUxODh9.EaKuAHJ3WYmn-5aLH6uPqXSALh7Y8AfKVpfvGlqcTws'
    it("update Request with No body", (done) => {
        chai
        .request(app)
            .patch("/tasks/8")
            .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.have.property('message',`REQUIRED TASK DETAILS`)
          done();
        });
    });
    it("update Request with No Token", (done) => {
        chai
        .request(app)
            .patch("/tasks/8")
            .send(ValidTask)
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });

    it("Updating Invalid Task", (done) => {
        chai
        .request(app)
            .patch("/tasks/5")  .set("Authorization", `Bearer ${authToken}`).send(InvalidTask)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.have.property('message',`TITLE SHOULD CONTAIN ATLEAST 1 LETTER`)
          done();
        });
    });
    it("Updating valid Task", (done) => {
        chai
        .request(app)
            .patch("/tasks/8")  .set("Authorization", `Bearer ${authToken}`).send(ValidTask)
        .end((err, res) => {
            chai.expect(res).to.have.status(204);
    
          done();
        });
    });
})