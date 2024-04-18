# Provenance App UI (frontend)
This repository comprises the frontend (user interface).


## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines".
- Install compatible Angular `npm install -g @angular/cli@15.2.9`
- `npm install` - installs required libraries from package.json. 

## Run
- Verify/set the `server_url` environment variable in [src/environments/environment.ts](src/environments/environment.ts)
- `ng serve` - compile and serve the application locally
- Open the browser at http://localhost:4200
- Enjoy!


## Build and Deployment
- Verify/set the `server_url` environment variable in [src/environments/environment.prod.ts](src/environments/environment.prod.ts)
- `ng build --configuration production --build-optimizer` - build the app and push the output into [angular.json](angular.json) > `outputPath` directory (default value = ["../server/public/"](../server/public/)). Follow instructions in the [../server/README.md](../server/README.md) for production deployment.