var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

var addr = "http://fridgebuddy555.azurewebsites.net";

describe('Test Post New User', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request(addr)
			.post("/users")
            .send({userId: "classDemoUser", email: "classDemoUser@test.com", isPremium: false, ssoID: "113077640384098947127"})
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return a single user object', function (){
		expect(response).to.have.status(200);
		expect(response).to.have.headers;
        expect(response).to.be.json;
    });

	it('The response has the expected attributes', function(){
        // User response contains expected attribute names
        expect(requestResult).to.have.property('userId');
        expect(requestResult).to.have.property('email');
        expect(requestResult).to.have.property('isPremium');
        expect(requestResult).to.have.property('ssoID');
	});	
	
});