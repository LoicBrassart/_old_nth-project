# No-name boilerplate for my projects

## Content

- 🔜 webapp/: React/Vite/React-Router frontend app
- ✅ graphql-api/: Standalone GraphQL api
- 🔜 restAPI/: REST api on a Node/Express server
- 🔜 companionApp/: mobile app in React-Native
- ✅ persist/: Everything we want to persist from one run to the next, but don't want to version with Git
- ✅ nginx.conf: A reverse-proxy configuration file to expose a single port for the whole project
- 🔜 .env.sample: A mock-file listing all environment variables needed for the project
- ✅ Makefile: Shortcuts for common commands (Docker manipulatioun especially)

## Setup

- Use make commands to get a simplified experience
- DockerCompose uses both file composition and aliases to limit repetition
- One \*.env file per environment, services only access variables listed in their description

## Ideas to go further

- Use secrets instead of env variables for security
