/// <reference types="react-scripts" />
/// <reference types="forge-viewer" />

import { URL } from "url"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string
      NODE_ENV: 'development' | 'production'
      PORT?: string

      REACT_APP_API_ENDPOINT: URL
      REACT_APP_FORGE_CLIENT_ID: string
      REACT_APP_FORGE_CLIENT_SECRET: string
      REACT_APP_URN: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }