// import dotenv from 'dotenv'
import RESTfulService from '../interfaces/RESTfulService'

// dotenv.config({
//   path: '../../../.env',
//   encoding: 'utf8',
//   debug: false
// }).parsed

const REQUEST: RESTfulService = {
  // protocol: process.env.PROTOCOL || 'http',
  // server: process.env.SERVER || 'localhost:3000'
  protocol: 'http',
  server: 'localhost:9999'
}

export const get = async (route: string): Promise<object> => {
  const response = await fetch(`${REQUEST.protocol}://${REQUEST.server}/${route}`)
  const result = await response.json()
  return result
}

export const post = async (
  route: string,
  body: JSON,
  jwt: string,
  contentType: string = 'application/json'
): Promise<JSON> => {
  const response = await fetch(`${REQUEST.protocol}://${REQUEST.server}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: `bearer ${jwt}`
    },
    body: JSON.stringify(body)
  })
  const result = response.json()
  return result
}
