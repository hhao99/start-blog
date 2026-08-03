import { createMiddleware } from '@tanstack/react-start'

const loggingMiddleware = createMiddleware({type: 'function'})
    // .server( async ({context,next}) => {
    //     console.log('server logging middleware')
    //     console.log('context: ', context)
    //     const result = await next()
    //     console.log('result: ', result)     
    //     return result
    // })
    .client( async ({context,next}) => {
        console.log('client logging middleware')
        console.log('context: ', context)
        const result = await next()
        console.log('result: ', result)
        return result
    })

export default loggingMiddleware