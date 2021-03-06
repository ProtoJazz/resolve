import { message } from '../constants'
import { checkRuntimeEnv, injectRuntimeEnv } from '../declare_runtime_env'

export default ({ resolveConfig, isClient }) => {
  if (isClient) {
    throw new Error(`${message.serverAliasInClientCodeError}$resolve.port`)
  }

  if (!resolveConfig.port) {
    throw new Error(`${message.configNotContainSectionError}.port`)
  }

  const exports = []

  if (checkRuntimeEnv(resolveConfig.port)) {
    exports.push(
      `const port = ${injectRuntimeEnv(resolveConfig.port)}`,
      ``,
      `export default port`
    )
  } else {
    exports.push(
      `const port = ${JSON.stringify(resolveConfig.port)}`,
      ``,
      `export default port`
    )
  }

  return {
    code: exports.join('\r\n')
  }
}
