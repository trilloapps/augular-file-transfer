// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  apiUrl: 'https://app-dev.cb-portal.trilloapps.com',
  TrilloAdminURL:'https://app-dev.cb-portal.trilloapps.com/cloud/UM',
  AdminRoute:'https://app-dev.cb-portal.trilloapps.com/cloud/UM',
  
  httpOptions: 
  {
    headers: new HttpHeaders({
                               'Content-Type': 'application/json',
                               'Accept': 'application/json',
                               'x-app-name': 'auth',
                               'x-org-name': 'cloud',
                             })
  },
  httpOptionsWithAccessToken: {
    headers: new HttpHeaders({
                               'Content-Type': 'application/json',
                               'Accept': 'application/json',
                               'x-app-name': 'main',
                               'x-org-name': 'cloud',
                             })
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
