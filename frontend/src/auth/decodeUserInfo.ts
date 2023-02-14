import jwt_decode from "jwt-decode";
import { DecodedAccessToken } from "./auth.types"

export default function decodeUserInfo(token: string) {
    const decoded: DecodedAccessToken = jwt_decode(token)
    return {
        email: decoded?.userInfo?.email,
        picture: decoded?.userInfo?.picture,
        name: decoded?.userInfo?.name,
        googleId: decoded?.userInfo.googleId
    }
}

