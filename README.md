# israeli-bank-scrapers-desktop

> Secure desktop app for retriving your transactions from all israeli banks and credit cards.

Based on [israeli-bank-scrapers](https://github.com/eshaham/israeli-bank-scrapers) project.

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/baruchiro/israeli-bank-scrapers-desktop.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/baruchiro/israeli-bank-scrapers-desktop/context:javascript)

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

[Beta milestone](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues?q=is%3Aopen+is%3Aissue+milestone%3ABeta)

## Contributing

The project is an *Electron* app, with *Vue* in the front-end, and mainly uses [israeli-bank-scrapers](https://github.com/eshaham/israeli-bank-scrapers) project.

### I need your help

This is the first time I write code in *NodeJS*, and of course it's the first time I use *Electron* and *Vue*.

I wrote this version "quick and dirty", because the goal was to get to the solution as quickly as possible. Now, if there is interest, I can continue to develop the app as I work on other projects as well, and of course I would love to get help.

#### You can help with the following:

Please note that we are currently in **beta**, and issues under [Beta Milestone](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues?q=is%3Aopen+is%3Aissue+milestone%3ABeta) are prioritized.

- [Opening new issues](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues/new)
- [Good first issues](https://github.com/baruchiro/israeli-bank-scrapers-desktop/contribute)
- English Corrections- I know I need help with English. Please report me language errors.
- [Brainstorming](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Abrainstorming+)- Design issues that I need help and consultation from experienced people.
- [Help wanted](https://github.com/baruchiro/israeli-bank-scrapers-desktop/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)- Issues I don't think I can do at this time.

#### Build Setup

### On Linux

Currently this library uses `libsecret` so you may need to install it before running `yarn`.

Depending on your distribution, you will need to run the following command:

* Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
* Red Hat-based: `sudo yum install libsecret-devel`
* Arch Linux: `sudo pacman -S libsecret`

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn dev

# build electron application for production
yarn build

# run unit & end-to-end tests
yarn test


# lint all JS/Vue component files in `src/`
yarn lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
