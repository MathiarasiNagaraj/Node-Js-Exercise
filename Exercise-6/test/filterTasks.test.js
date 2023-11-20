const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);


describe("filter task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDUxOTQxLCJleHAiOjE3MDA0NTM3NDF9.29oWBYZ-LaYklipZRba-5lXKKKaEiT4hSdKgyLXg_T4'
    
    it("filter Request with No Token", (done) => {
        chai
        .request(app)
            .get("/tasks/filter?filter?priority=medium")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });

    it("filtering by priority", (done) => {
        chai
        .request(app)
            .get("/tasks/filter?priority=medium")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
     
            chai.expect(res.body).to.deep.equal({
                message: [
                  {
                    title: 'task 8',
                    description: 'task description',
                    priority: 'medium',
                    dueDate: '12/5/2023',
                    comments: [
                "do it",
                "98708"
            ],
                    createdDate: '2023-11-20T01:42:17.990Z',
                    id: 2
                  },
                  {
                    title: 'ui',
                    description: 'task description',
                    priority: 'medium',
                    dueDate: '12/23/2023',
                    comments: [
                "do it",
                "98708"
            ],
                    createdDate: '2023-11-20T01:42:23.432Z',
                    id: 3
                  }
                ]
              })
  
          done();
        }); 
    }); 
})

