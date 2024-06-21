// import dotenv from 'dotenv'
import RESTfulService from '../interface/RESTfulService'

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

export const get = async (
  route: string,
  jwt?: string,
  contentType: string = 'application/json'
): Promise<object> => {
  console.log(jwt)
  const response = await fetch(`${REQUEST.protocol}://${REQUEST.server}/${route}`, {
    headers: {
      Authorization: `bearer ${jwt}`,
      'Content-Type': contentType
    }
  })
  const result = await response.json()
  return result
}

export const post = async (
  route: string,
  body: object,
  jwt?: string,
  contentType: string = 'application/json'
): Promise<JSON> => {
  const response = await fetch(`${REQUEST.protocol}://${REQUEST.server}/${route}`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${jwt}`,
      'Content-Type': contentType
    },
    body: JSON.stringify(body)
  })
  const result = response.json()
  return result
}
