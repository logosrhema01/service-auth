import { verifyToken, makeAccessTokenFactory, JWT } from '@chatdaddy/service-auth-client'
import logger from './logger'

const getAccessToken = makeAccessTokenFactory({
    request: {
        refreshToken: process.env.SERVICE_REFRESH_TOKEN!,
        //scopes: [Scope.AdminPanelAccess] // uncomment if you want to use certain scopes
    }
})

let authenticate: typeof verifyToken
if(process.env.NODE_ENV === 'test') {
    authenticate = (token: string) => {
        try {
            return JSON.parse(Buffer.from(token, 'base64').toString()) as JWT
        } catch (error) {
            return verifyToken(token)
        }
    }
    logger.warn('[UNSAFE] using test authentication')
} else authenticate = verifyToken

export { getAccessToken, authenticate }