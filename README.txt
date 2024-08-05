Title of the submission: ProvenanceWidgets - A JavaScript library of UI Controls for Tracking and Dynamically Overlaying Analytic Provenance

Authors: Arpit Narechania, Kaustubh Odak, Mennatallah El-Assady, and Alex Endert

Operating Systems: Windows 10 or newer, MacOSX 11 or newer, Ubuntu 20.04.1 LTS or newer

All instructions for setting up and running the project are described at the end of this document, and also in `INSTRUCTIONS.txt`.

The source code is linked as a submodule in the `_lib` directory. It is also available at https://github.com/ProvenanceWidgets/ProvenanceWidgets.

The liability form is available in `LIABILITY.txt`.

--- INSTRUCTIONS ---

Script/Instructions for downloading the required dependencies and compiling the code:

1. Open a terminal on your machine and navigate to this project's top-level directory (i.e. where this file is).
2. Download and install node and npm by following the instructions from https://nodejs.org/en/download/. As noted in `package.json` > "engines", ProvenanceWidgets supports node 20.x LTS or newer and npm 10.x or newer. If you already have an incompatible version of node/npm, use a node version manager (e.g. https://github.com/nvm-sh/nvm or https://github.com/jasongin/nvs) to switch to a supported version.
3. Install the compatible angular version using `npm install -g @angular/cli@15.2.9`
4. Install the required dependencies from package.json using `npm install`.
5. (Optional) - Build a production version of the project in the `/dist` folder using `npm run build`. This step is not required for running the project.

Script/Instructions for reproducing the results in the paper: Using the same terminal from the previous steps, run `npm run start`. The project should now be accessible on `localhost:4200`, provided the port is available. If not, the terminal will prompt you for making it accessible on the next available port.

The visualizations from the paper can be accessed by visiting the following URLS:
1. Scented widgets: http://localhost:4200/#/scented-widgets
2. Phosphor objects: http://localhost:4200/#/phosphor-objects
3. Dynamic Query Widgets: http://localhost:4200/#/dynamic-query-widgets-homefinder
4. Widgets to visualization one-way interaction: http://localhost:4200/#/widgets-to-vis-one-way
5. Visualization to widgets one-way interaction: http://localhost:4200/#/vis-to-widgets-one-way

