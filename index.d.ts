/**
 * Wrap http server as https
 * @author imcuttle
 */
import * as httpProxy from 'http-proxy'

declare module 'https-wrapper' {
  type Options = {
    days?: number
    commonName?: string
  }

  type httpsWrapper = (opt: Options & httpProxy.ServerOptions) => Promise<httpProxy>

  export = httpsWrapper
}
