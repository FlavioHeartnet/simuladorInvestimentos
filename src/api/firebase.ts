// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export class FirebaseConfig {
    private analytics;
    constructor(private apiKey?:string, private authDomain?: string, private projectId?: string, private storageBucket?: string, private messagingSenderId?: string, private appId?: string, private measurementId?: string ){
        const firebaseConfig = {
            apiKey: apiKey,
            authDomain: authDomain,
            projectId: projectId,
            storageBucket: storageBucket,
            messagingSenderId: messagingSenderId,
            appId: appId,
            measurementId: measurementId
          };
          const app = initializeApp(firebaseConfig);
          this.analytics = getAnalytics(app);
    }
    
    
    logEvents(eventName: string, params?: any){
        logEvent(this.analytics, eventName, params);
    } 
}