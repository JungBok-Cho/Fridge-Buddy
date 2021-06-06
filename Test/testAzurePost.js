var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

var addr = "http://fridgebuddy555.azurewebsites.net";

describe('Test Post New Review', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(addr)
			.post("/users")
            .send({userId: "testUser", password: "testing", email: "test@test.com", firstName: "test", lastName: "test", isPremium: false})
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return a single recipe object', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
        expect(response).to.be.json;
    });

	it('The response has the expected attributes', function(){
        // Recipe contains expected attribute names
        expect(requestResult).to.have.property('userId');
        expect(requestResult).to.have.property('password');
        expect(requestResult).to.have.property('email');
        expect(requestResult).to.have.property('firstName');
        expect(requestResult).to.have.property('lastName');
        expect(requestResult).to.have.property('isPremium');
	});	
	
});