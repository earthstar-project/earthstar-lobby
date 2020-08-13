# greetings from the lobby

This is a small Earthstar client built to experiment with earthstar and earthstar-graphql.

- React for the UI
- Relay for managing data and fetching from earthstar-graphql
- styled-components for styling the app

This client is currently hardcoded to a single workspace (+lobbydev), and a single pub. It uses in-memory storage, so you lose your local state on reloads (it is re-fetched from the pub on launch). This makes this a traditional app with a client and server, but this will feel more p2p-ey when you can use multiple workspaces and pubs in this client.

I wrote this in a short amount of time, with the tools I like, in a scrappy way. So this codebase might not be very approachable. But I have commented on everything.

## Planned

- Support for multiple workspaces with multiple pubs
- Dark mode + custom themes, fonts (the guts are there, just need to make the themes, UI for picking them...)

## Reading this codebase

Start at App.tsx. This is the root of the project.
