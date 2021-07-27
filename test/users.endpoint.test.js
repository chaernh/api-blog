const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../bin/www')

// configure chai
chai.use(chaiHttp)
chai.should()

let expect = chai.expect

describe("Users endpoint", () => {
    it("Should be unauthorized to get all users without token", (done) => {
        chai.request(server).get('/api/users').end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })

    it("Should be unauthorized to insert new users without token", (done) => {
        chai.request(server).post('/api/users').end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })

    it("Should be unauthorized to update users without id", (done) => {
        chai.request(server).put('/api/users').end((err, res) => {
            res.should.have.status(404)
            done()
        })
    })

    it("Should be unauthorized to delete users without token", (done) => {
        chai.request(server).delete('/api/users').end((err, res) => {
            res.should.have.status(401)
            done()
        })
    })
})

let token
describe("Login", ()=> {
    it("should return token", (done) => {
        chai.request(server)
        .get('/auth/login')
        .auth('chaernh', '9993758923')
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            token = res.body.token;
            done();
        });
    });

    it("should get all users", (done)=> {
        chai.request(server)
        .get('/api/users')
        .set('authorization',`Bearer ${token}`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    })

    // it("should insert new roles", (done)=> {
    //     chai.request(server)
    //     .post('/api/roles')
    //     .set('authorization',`Bearer ${token}`)
    //     .send({ name: 'admin', name_long:'Admin Chai', priority: 1, description: 'Admin Chai' })
    //     .end((err, res) => {
    //         expect(err).to.be.null;
    //         res.should.have.status(200);
    //         console.log(res.body.data)
    //         done();
    //     });
    // })
})