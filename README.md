# GameServer Service 2.0

## Summary

A re-implementation of my old GameServer Service project (https://github.com/NickToony/gameserver-service).

GameServer Service is a platform for server lists. It allows hosts to register themselves with the platform, and for players to find and connect to those servers. It doesn't run game servers itself, but instead acts as a directory for them.

In future the platform may be expanded to support basic scaling, monitoring and matchmaking.

## Disclaimer

The previous platform used very outdated versions of Laravel and Bootstrap, which were difficult to securely host on newer platforms. This barebones re-implementation seeks to allow my old game projects to continue to function.

It is not ready for any real use cases.

## Dependencies

- Node 20
- NestJS 11
- TypeORM
- PostgreSQL
- Redis

## Deployment

Docker image is provided. You can find up to date images at:
https://hub.docker.com/repository/docker/nicktoony/gameserver-service/general

## Running locally

1. Install dependencies with `yarn`
2. Run docker-compose image to get PostgreSQL and Redis running
3. Run `yarn start:dev` to start the server
4. Visit `http://localhost:3000` to see the server running

## Roadmap

- [x] Legacy API compatibility
- [ ] Tests
- [ ] User Authentication
- [ ] User interface to manage games
- [ ] New API that isn't restricted by old design choices
- [ ] Monitoring/statistics
- [ ] Scaling
- [ ] Matchmaking
- [ ] Documentation
