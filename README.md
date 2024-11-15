# ProvenanceWidgets Homepage
The homepage for ProvenanceWidgets - A JavaScript library of UI Controls for Tracking and Dynamically Overlaying Analytic Provenance. This repository includes demos that showcase the capabilities of ProvenanceWidgets and examples of how the library can be used in various scenarios.

Authors: Arpit Narechania, Kaustubh Odak, Mennatallah El-Assady, and Alex Endert

Operating Systems: Windows 10 or newer, MacOSX 11 or newer, Ubuntu 20.04.1 LTS or newer

## Setup
- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines".
- `npm install` - installs required libraries from package.json. 

## Run
- `npm run start`
- Open the browser (preferably Chrome) at [http://localhost:4200](http://localhost:4200).

## Test
- `npm run test`

## Build
- `npm run build`  outputs the build in the `./build/` folder.

## Deployment
- GitHub Actions is setup via the `.github/workflows/build.yaml` file. Built files are pushed to `gh-pages` branch and served via Github Pages at [https://provenancewidgets.github.io](https://provenancewidgets.github.io).