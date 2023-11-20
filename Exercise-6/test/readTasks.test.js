const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);


describe("Read task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDA2NzEwLCJleHAiOjE3MDA0MDg1MTB9.fcZwFRWuloq7YHHA-FNFTAmX_R_fUuQlXQilQqunmyQ'

    it("Read Request with No Token", (done) => {
        chai
        .request(app)
            .get("/tasks")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });
    it("Read Request with Invalid Task Id", (done) => {
        chai
        .request(app)
            .get("/tasks/45").set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.have.property('message',`INVALID TASK ID`)
          done();
        });
    });
    it("Reading All tasks", (done) => {
        chai
        .request(app)
            .get("/tasks")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.property('message').to.be.an('array')
          done();
        });
    });
    it("Reading valid Task id ", (done) => {
        chai
        .request(app)
            .get("/tasks/4")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.property('message').to.be.an('object')
          done();
        });
    });
})