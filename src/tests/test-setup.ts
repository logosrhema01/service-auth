import dotenv from 'dotenv'
dotenv.config({ path: '.env.test' }) // ensure we load this one

import { Application } from 'express'
import getConnection from '../utils/get-connection'
import makeTestServer from './make-test-server'

export const TEST_TEAM_ID = '071dd86e-1e35-45bc-82cf-38287f703a97'
export const TEST_TOKEN = Buffer.from(JSON.stringify({ 
    teamId: TEST_TEAM_ID, 
    scope: [...Array(100)].map(() => '1').join('') 
})).toString('base64')
export const TEST_TOKEN2 = Buffer.from(JSON.stringify({ 
    teamId: 'TEST_TEAM_ID2',
    scope: [...Array(100)].map(() => '1').join('') 
})).toString('base64')

jest.setTimeout(20_000)

export const describeWithApp = (
    name: string,
    tests: (
        app: Application
    ) => void,
) => describe(name, () => {
    const app = makeTestServer()

    afterAll(async () => {
        const conn = await getConnection()
        conn.close()
    })

    tests(app)
})
