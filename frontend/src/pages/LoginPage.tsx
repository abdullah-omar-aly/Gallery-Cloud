import React, {  useEffect } from "react";
import { useLocation, useNavigate , useSearchParams} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useGoogleOAuthUrl from "../auth/useGoogleOAuthUrl";

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()

    const googleOAuthURL = useGoogleOAuthUrl()
  const [searchParams , setSearchParams] = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
  if (token) {
    console.log('yes' , token)
    auth.login(token)
    //     const redirectPath = location.state?.path || "/"
//     navigate(redirectPath, { replace: true })
  }
  } , [])


  return (
    <div>

      <button
        disabled={!googleOAuthURL}
        onClick={() => window.location.href = googleOAuthURL}
      >Login with google</button>
    </div>
  );
}

export default LoginPage;
