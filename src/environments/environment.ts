// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api : {
    storeLocations: '/assets/data/stores.json',
    storeSummary: '/assets/data/store-summary.json',
    storeDetails: 'assets/data/store-details.json',
    storesTimeSeriesData: 'assets/data/stores-time-series-data.json',
    devices: 'assets/data/devices.json',
    users: 'assets/data/users.json'
  },
  googleMapApiKey: 'AIzaSyCJiE0nocRvRIIHXH0tqfIhX5zsw3SbH84'
};
