# israeli-bank-scrapers-desktop

> Secure desktop app for retriving your transactions from all israeli banks and credit cards.

Based on [israeli-bank-scrapers](https://github.com/eshaham/israeli-bank-scrapers) project.

## Security Principles

This app has two main principles:

1. **Local running:** This app goes to the bank website, exactly the same way you do.  
Therefore, you don't have to rely on a third party to keep your passwords.

2. **Open Source:** Can't believe me the information wasn't sent out?  
Here is the source code, read it (or ask a friend to), and you will see that there is no malicious code.

## Welcome to the beta

The project is currently in beta, which means we focus on two main goals:

1. **Minimal Valuable Flow:**  
Bringing the app to a level where the user can perform the minimum flow- importing and exporting, conveniently and clearly, without critical bugs.

2. **Open Source Project:**  
Bringing the project to a stage where it is easy for new contributors to enter, understand and contribute. This includes good documentation, testing, etc.

When you look at the project, please try to think about both of these goals.

## Contributing

The project is an *Electron* app, with *Vue* in the front-end, and mainly uses [israeli-bank-scrapers](https://github.com/eshaham/israeli-bank-scrapers) project.

### I need your help

This is the first time I write code in *NodeJS*, and of course it's the first time I use *Electron* and *Vue*.

I wrote this version "quick and dirty", because the goal was to get to the solution as quickly as possible. Now, if there is interest, I can continue to develop the app as I work on other projects as well, and of course I would love to get help.

#### You can help with the following:

- [Opening new issues](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues/new)
- [Good first issues](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- English Corrections- I know I need help with English. Please report me language errors.

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
