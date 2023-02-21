import { AutoFut } from './enums'

export const selectAutofutJsonMessage = () => {
  const autofutJsonMessageElement = document.getElementById(
    AutoFut.jsonMessageElementId
  )
  return autofutJsonMessageElement
}
