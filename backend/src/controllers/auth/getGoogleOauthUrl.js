import querystring from "querystring";

export async function handler(req , res) {
    const url = getGoogleOauthUrl()
    res.status(200).json({url})
}


// example for the generated url
// "url": "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=856486099546-1rdbim37ta23n01g3a3kvvfklldqdqhv.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fgoogle%2Fcallback"

// helper function for generating the url for us
function getGoogleOauthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${process.env.SERVER_ROOT_URI}/api/auth/google/callback`, 
        client_id:  process.env.GOOGLE_CLIENT_ID  ,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    // return `${rootUrl}?${querystring.stringify(options)}`;
    const params = new URLSearchParams(options)
    return `${rootUrl}?${params.toString()}`;
}


