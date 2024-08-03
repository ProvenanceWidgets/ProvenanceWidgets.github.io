# ProvenanceWidgets Homepage
This repository comprises the homepage for ProvenanceWidgets.


## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines".
- Install compatible Angular `npm install -g @angular/cli@15.2.9`
- `npm install` - installs required libraries from package.json. 

## Run
- `ng serve` - compile and serve the application locally
- Open the browser at http://localhost:4200
- Enjoy!


## Build and Deployment
- `ng build --configuration production --build-optimizer` > outputs the build in the `./dist/` folder.