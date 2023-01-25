const request = require('supertest');

const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .then(data => console.log("original data header:" , data.header))
        });
        
        it('responds with NOT the login page when it gets passed a cookie', () => {
          return request(server)
          .get('/')
          .set('Cookie', ['session=p56CD8DDqr0IUx5ufV-nIfOYiMR03H9j.gQr610CojtiE5IfuC/SZI0CEh/zDII02ABP7jgcqYQw'])
          // .set('Cookie', ['session=p56CD8DDqr0IUx5ufV-nIfOYiMR03H9j.gQr610CojtiE5IfuC/SZI0CEh/zDII02ABP7jgcqYQw'])
          .expect(200)
          .then(data => console.log("cookie data header:" , data))
      })
    });
  });

  describe('/login', () => {
    let userLogin = {username : "hello@goodbye.com", password: "hello"}
    describe('POST', () => {
      xit('responds with 200 status and cookie', () => {
        return request(server)
          .post('/login')
          .send(userLogin)
          .expect((data) => {return data.header}).toBeDefined()
          .expect(200)
          // .expect((data) => data.get("Set-Cookie").toBeDefined())
          // .expect(request.cookie)
          // .expect('Content-Type', /application\/json/)
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      xit('markets from "DB" json are in body of response', () => {
        // function testBody (res) {
        //   return res.body.should.have.property("location")
        // }
// 
        return request(server)
          .get('/markets')
          // .expect(function(res) {
          //   res.body.isArray = Array.isArray(res.body)
          //   res.body.hasLoc = typeof res.body[0].location === "string"
          //   res.body.hasCards = typeof res.body[0].cards === "number"
          //   // res.body.name = res.body.name.toLowerCase();
          // })
          // .expect(200, { location : "*"})
          // .query({location})
          // .expect('body', [{"location":"chicago","cards":69},{"location":"New Orleans","cards":20}])
          .then(result => {

            if (!Array.isArray(result.body)) {
              throw new Error("body is not Array")
              }

            if (result.body[0].location === undefined) {
              throw new Error("response first element does not have location")
            }
            
            if (result.body[0].cards === undefined) {
              throw new Error("response first element does not have cards")
            }
            }

            )
            
          // .expect(200, function(err, res) {
          //   console.log(res)
          //   res.body[0].location.should.be.equal('hello');
          //   done();
          // })
            
            // {isArray : true, hasLoc : true, hasCards : true})
          // .expect()
          // .expect(response => response.body[0].location).toEqual("ndfdfdfdy")
          // .then(response => console.log(response.body))
          //markets from db have a location value and a cards value and are in an array, so array[0] should have both
          // .expect(response => response.body).to
          //   response => {
          //   return response.body[0].location === "sdjkhfdsjfh"
          // })
          // .expect(response => response.body[0].cards)
      });
    });

    describe('PUT', () => {
      xit('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/markets')
          .send([{location : 'chicago', cards : 69}, {location: 'New Orleans', cards: 20}])
          .expect(200)
          .expect('Content-Type', /application\/json/)
      });

      xit('responds with the updated market list', () => {
        const firstBody = [ { "location": "NYC", "cards": 4 }, { "location": "LA", "cards": 1 } ]
        return request(server)
          .put('/markets')
          .send([{location : 'chicago', cards : 69}, {location: 'New Orleans', cards: 20}])
          .expect(200)
          .then(response => console.log(response.body))
      });

      xit('responds to invalid request with 400 status and error message in body', () => {
        
      });
    });
  });
});
