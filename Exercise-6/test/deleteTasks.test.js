const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);


describe("Delete task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDEwMTA4LCJleHAiOjE3MDA0MTE5MDh9.q0LIpZREZF-WatxQuBF2PSXAMobb_ieGjX2nv6hHh6w'

    it("Delete Request with No Token", (done) => {
        chai
        .request(app)
            .delete("/tasks")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });
    it("Delete Request with Invalid Task Id", (done) => {
        chai
        .request(app)
            .delete("/tasks/45").set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.have.property('message',`INVALID TASK ID`)
          done();
        });
    });
    it("Deleteing valid Task id ", (done) => {
        chai
        .request(app)
            .delete("/tasks/6")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.have.property('message','DELETED SUCCESSFULLY')
          done();
        });
    });
    it("Deleteing All tasks", (done) => {
        chai
        .request(app)
            .delete("/tasks")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);


          done();
        });
    });

})