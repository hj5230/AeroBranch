import { get } from '.'

const baseRoute = 'user'

interface IVerifyMacAddress {
  macOk: boolean
}

export const verifyMacAddress = async (macAddress: string): Promise<boolean> => {
  const body = (await get(`${baseRoute}/verify/${macAddress}`)) as unknown as IVerifyMacAddress
  return body.macOk
}
