import { apiKey,authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId  } from '$env/static/private';

export type Config = {
    apiKey?:string,
    authDomain?: string,
    projectId?: string,
    storageBucket?: string,
    messagingSenderId?: string,
    appId?: string,
    measurementId?: string

}

export const config: Config = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
}