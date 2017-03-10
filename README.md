# webapp-dev-server
> Static webapp development server

Serves static webapp assets via port `9099`.

## Setup

Install dependencies :)

```
$ npm install
```


## Run

The `./webapps` directory will be served at `http://localhost:9099/`. If there's a file at `./webapps/test/bundle.min.js` that will be available at `http://localhost:9099/test/bundle.min.js`. This allows one or more webapps to be served from the `./webapps` directory.

Note: directory requests will serve an `index.html`, if present in the directory.

```
$ npm run webapps
```

Server entry point is `server.js`.


## Clean

Remove all contents of the `./webapps` directory (except `.gitignore`).

```
$ npm run clean
```

Clean entry point is `clean.js`.
