import { useState } from "react"
import { AuthenticationTokenContext } from "../AuthenticationToken"


export const AuthenticationTokenProvider = ({children}) => {

    const [token, setToken] = useState(null);
    return <AuthenticationTokenContext.Provider value={{token, setToken}}>{children}</AuthenticationTokenContext.Provider>
}