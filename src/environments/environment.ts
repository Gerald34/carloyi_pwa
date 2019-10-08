// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ws_url: 'http://localhost:5000',
  firebase: {
    apiKey: 'AIzaSyAJK_54nF15RxvVZNVi0QaYrMwofyCLwqk',
    authDomain: 'carloyi-6928d.firebaseapp.com',
    databaseURL: 'https://carloyi-6928d.firebaseio.com',
    projectId: 'carloyi-6928d',
    storageBucket: 'carloyi-6928d.appspot.com',
    messagingSenderId: '217135724817'
  }
};
