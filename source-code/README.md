# ProvenanceWidgets Home Page


## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines".
- `npm install` - installs required libraries from package.json. 


## Build and Deployment
- `ng build --configuration production --build-optimizer` - build the app and push the output into [angular.json](angular.json) > `outputPath` directory (default value = ["dist/"](dist/)).