const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const expect = chai.expect;
chai.use(chaiHttp);

let authToken;

describe('POST /signup', () => {
    it('should create a new user', (done) => {
        chai.request(app)
            .post('/users')
            .send({
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                password: 'password'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                done();
            });
    });
});

describe('API Endpoints', () => {
    before((done) => {
        chai.request(app)
            .post('/api/authenticate')
            .send({
                email: 'john.doe@example.com',
                password: 'password'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                authToken = res.body.token;
                done();
            });
    });

    describe('GET /api/resumes', () => {
        it('should return a list of resumes', (done) => {
            chai.request(app)
                .get('/api/resumes')
                .set('authorization', `${authToken}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /api/resumes/:id', () => {
        it('should return a single resume', (done) => {
            const id = '12345';
            chai.request(app)
                .get(`/api/resumes/${id}`)
                .set('authorization', `${authToken}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body._id).to.equal(id);
                    done();
                });
        });
    });

    describe('POST /resumes', () => {
        it('should create a new resume', (done) => {
            chai.request(app)
                .post('/resumes')
                .set('authorization', `${authToken}`)
                .send({
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    position: 'Software Engineer',
                    skills: [
                        'JavaScript',
                        'React',
                        'Node.js'
                    ]
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });
    });

    describe('PUT /api/resumes/:id', () => {
        it('should update an existing resume', (done) => {
            const id = '12345';
            chai.request(app)
                .put(`/api/resumes/${id}`)
                .set('authorization', `${authToken}`)
                .send({
                    position: 'Full Stack Developer'
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.position).to.equal('Full Stack Developer');
                    done();
                });
        });
    });

    describe('DELETE /api/resumes/:id', () => {
        it('should delete an existing resume', (done) => {
            const id = '12345';
            chai.request(app)
                .delete(`/api/resumes/${id}`)
                .set('authorization', `${authToken}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body._id).to.equal(id);
                    done();
                });
        });
    });
});
