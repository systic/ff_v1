# StoreDevicesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Libraries used

1) [ngx-scrollbar](https://github.com/zefoy/ngx-perfect-scrollbar) for custom scrollbar

2) [ng-bootstrap](https://ng-bootstrap.github.io/#/home) along with [bootstrap](https://getbootstrap.com/) as the main css framework


## Succesful login

For successful login use these credentials

1) For admin user --    username: "admin"  with any passoword

2) For general user --  username: "general" with any password



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Deploying to heroku

My heroku deployment is at `https://tc-store-devices-health.herokuapp.com`

Install latest Heroku CLI:
``` sh
$ npm install -g heroku-cli
```

Login to heroku:
``` sh
$ heroku login
```

Create the heroku application:
``` sh
$ heroku apps:create <application-name>
```

Add the code to the heroku instance:
``` sh
$ git add .
$ git commit -m "init"
```

Deploy code to heroku
``` sh
$ git push heroku master
```

Then browse to `https://<application-name>.heroku.com`

