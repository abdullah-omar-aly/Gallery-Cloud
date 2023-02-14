import React, { useEffect } from 'react'
import { axiosPrivate } from '../api/axios'
import { useAuth } from './AuthContext'
import useRefreshToken from './useRefreshToken'


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const  auth  = useAuth();

    useEffect(() => {
        // use refresh token after the response sent back with 403 (token not valid)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log('access token invalid , requested a new one')
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        // or use check the access token in every request before sending it and refresh it if needed
        // axiosPrivate.interceptors.request.use(
        //     async (config) => {
        //       const user = store?.getState()?.userData?.user;
          
        //       let currentDate = new Date();
        //       if (user?.accessToken) {
        //         const decodedToken: { exp: number } = jwt_decode(user?.accessToken);
        //         if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //           await store.dispatch(refreshToken());
        //           if (config?.headers) {
        //             config.headers["authorization"] = `Bearer ${
        //               store?.getState()?.userData?.user?.accessToken
        //             }`;
        //           }
        //         }
        //       }
        //       return config;
        //     },
        //     (error) => {
        //       return Promise.reject(error);
        //     }
        //   );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

