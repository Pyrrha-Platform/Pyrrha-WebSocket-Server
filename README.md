# Pyrrha WebSocket server

This repository contains the [Pyrrha](https://github.com/Code-and-Response/Prometeo) solution that monitors the MQTT queue for new messages and in turn sends them to the [Websocker Server](https://github.com/Call-for-Code/Prometeo-WebSocket-Server) and also stores them in the [database](https://github.com/Call-for-Code/Prometeo-Database).

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

## Setting up the solution

### Prerequisites
1. [Docker](https://docs.docker.com/desktop/)
2. [IBM CLI](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli)
3. [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
4. [Helm](https://helm.sh/docs/intro/install/)
5. [Skaffold](https://skaffold.dev/docs/install/)

### Run locally with Node.js
1. Install dependencies
   ```
   npm install
   ```
2. Run server
   ```
   npm start
   ```
   This runs the websocket server using nodemon. See [package.json](package.json) file.

### Running locally using docker
1. Build the image and optionally tag
   ```
   docker build . -t ws
   ```
   ```
    STEP 1: FROM docker.io/node:12-alpine
    STEP 2: WORKDIR /
    --> ce0dd4bfad1
    STEP 3: COPY package*.json ./
   ```
2. Run the image
   ```
   docker run --name ws ws:latest
   ```

### Running on Kubernetes
1. The project uses [helm](https://helm.sh/) charts to deploy the service to Kubernetes. You can use the following command to see what the final charts look like:
    ```
    helm template <chart_name> chart/ws --dry-run  
    ```
2. You can use the following command to install the charts on Kubernets, but we suggest creating a CI/CD pipeline to automate code testing and deployment in your cluster.
   ```
   helm upgrade <chart_name> chart/ws -i 
   ```


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting Pyrrha pull requests.

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
