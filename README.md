# remp-node-api

Thin wrapper around the [REMP](https://github.com/remp2020/) server API for Node.js.

This package nor the author are related in any way with Remp or Dennikn.sk.

## How to use this package?

Install the package via your favourite node.js package manager.

In general you, set up a *Remp* instance with your server URL and the bearer token, then you call `get()` or `post()` of that instance with the API URL path and the parameters. The result is the JSON reponse already decoded into a plain old JS object.