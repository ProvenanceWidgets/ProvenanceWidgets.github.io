# ProvenanceWidgets Documentation

The homepage and documentation for ProvenanceWidgets. Version 2.0 integrates SuperProvenanceWidgets (SW), an extension for tracking and visualizing analytic provenance across multiple UI controls. This repository also contains the SW live playground.

Operating Systems: Windows 10 or newer, MacOSX 11 or newer, Ubuntu 20.04.1 LTS or newer

## Setup

- Open the command line/terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
- Download and install node, npm from https://nodejs.org/en/download/. Optionally, use the <a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Node Version Manager)</a> to quickly install and use different versions of node via the command line. Note the compatible node/npm version in package.json > "engines" (Node 18+; the docs recommend Node 20.19+ / 22.12+ and npm 10.0+).
- `npm install` - installs required libraries from package.json.
- `npm install --prefix playgrounds/sw-live` - installs the dependencies of the SW live playground (the site's `start`/`build` scripts build it first).

## Run

- `npm run start`
- Open the browser at [http://localhost:3000](http://localhost:3000).

## Verify

- `npm run typecheck`
- `npm run build`

## Deployment

- GitHub Actions is setup via the `.github/workflows/build.yaml` file. On push to `main`, the site is built and deployed to GitHub Pages at [https://provenancewidgets.github.io](https://provenancewidgets.github.io).
