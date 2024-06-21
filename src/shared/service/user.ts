import { get, post } from '.'

const baseRoute = 'user'

interface VerifyMacAddressResponse {
  macOk: boolean
}

export const verifyMacAddress = async (macAddress: string): Promise<boolean> => {
  const body = (await get(
    `${baseRoute}/verify/${macAddress}`
  )) as unknown as VerifyMacAddressResponse
  return body.macOk
}

interface SignInResponse {
  username: string
  token: string
  errno: 'USRNF' | 'PWDNM'
}

export const signIn = async (macAddr: string, password: string): Promise<SignInResponse> => {
  const body = (await post(`${baseRoute}/sign`, {
    macAddr,
    password
  })) as unknown as SignInResponse
  return body
}

interface parseJwtResponse {
  userId: number
  username: string
  iat: number
  exp: number
}

export const verifyJwt = async (): Promise<parseJwtResponse | null> => {
  const token = window.localStorage.getItem('jwt')
  // console.log(token)
  if (!token) return null
  const body = (await get(`${baseRoute}/verify`, token)) as unknown as parseJwtResponse
  return body
}
