// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCahMTgPm5jkevkwd9gEjM0osbSvQUyx6E",
    authDomain: "myapp-20440.firebaseapp.com",
    databaseURL: "https://myapp-20440.firebaseio.com",
    projectId: "myapp-20440",
    storageBucket: "myapp-20440.appspot.com",
    messagingSenderId: "398247660774"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
