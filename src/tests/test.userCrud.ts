import request from 'supertest'
import { describeWithApp, TEST_TOKEN } from './test-setup'

describeWithApp('User', (app) => {
    it('should get users', async () => {
        await request(app)
            .get('/users?q=Adhiraj')
            .set('Authorization', `Bearer ${TEST_TOKEN}`)
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(() => {})
    })
})
