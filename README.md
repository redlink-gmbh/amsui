# Getting started

The Angular Material Search UI, in short AMSUI, is build to deliver search UI components that already include all the best practices.
These are needed to guarantee a great search experience for your users.

As the name already stated, the library is an extensions for the Angular Material library.

## Development instructions

The library can be used in the development process in three different scenarios:

1. Maintaining, releasing, developing the library itself
2. Using the library's search service, UI components and the Backend Adapter Service for a MVP-like search application/page.
3. Using some of the UI components standalone from the library.


## Library development setup

We use nvm (NodeJS version manager) to be sure that our project works everytime someone else tries to start/edit the AMSUI library.
If you are not familiar with nvm, you can find it [here](https://github.com/nvm-sh/nvm).

You should use the specified version of NodeJS in the [NVM config file](.nvmrc).
Just execute the command `nvm use` and you are good to go, or you could set up an automatic switch like it is done [here](https://medium.com/@kinduff/automatic-version-switch-for-nvm-ff9e00ae67f3).

First, you need to install the npm dependencies.

```
npm install
```

Then, you can build and watch the library with the following command:

```
npm run dev:amsui
```

The next command copies translations and styles once into the dist folder.
If you change a translation or something inside the global style of library, you need to manually run it again.

```
npm run copy:all
```

At last, the demo project can be started like this:

```
npm start
```

**Important notes:**

- Add prettier formatter on save in intellij products for a better developer experience.
- To be able to run the demo project with data, you need a Solr index and write a transformer service for the response docs.

