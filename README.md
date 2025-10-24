# Pyrrha WebSocket server

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/static/v1?label=Slack&message=%23prometeo-pyrrha&color=blue)](https://callforcode.org/slack)

This repository contains the [Pyrrha](https://github.com/Pyrrha-Platform/Pyrrha) solution that monitors the MQTT queue for new messages, stores them in the [database](https://github.com/Pyrrha-Platform/Pyrrha-Database), and in turn sends them to the [Websocker Server](https://github.com/Pyrrha-Platform/Pyrrha-WebSocket-Server)s.

## Setting up the solution

### Prerequisites

1. [Docker](https://docs.docker.com/desktop/)
1. [IBM CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli)
1. [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
1. [Helm](https://helm.sh/docs/intro/install/)
1. [Skaffold](https://skaffold.dev/docs/install/)

### Run locally with Node.js

1. Install dependencies

   ```bash
   npm install
   ```

1. Run server

   ```bash
   npm start
   ```

   This runs the WebSocket server using nodemon. See [package.json](package.json) file.

### Running locally using docker

1. Build the image and optionally tag

   ```bash
   docker build . -t ws
   ```

   ```bash
    STEP 1: FROM docker.io/node:12-alpine
    STEP 2: WORKDIR /
    --> ce0dd4bfad1
    STEP 3: COPY package*.json ./
   ```

1. Run the image

   ```bash
   docker run --name ws ws:latest
   ```

### Running on Kubernetes

1. Please read [KUBERNETES_SETUP.md](https://github.com/Pyrrha-Platform/Pyrrha/blob/main/KUBERNETES_SETUP.md) for details on how to deploy using Kubernetes.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Pyrrha pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
