# Contributing Guide

Thank you for taking the time to contributing to VSpaceCode.

## Philosophy

This extension aims to provide the best out-of-the-box experience like spacemacs. As much as we would like, there is going to be differences in how things like key bindings are handled. We will try to provide escape hatch whenever we can to allow customization.

## First Time Setup

1. Install prerequisites:
    - [Visual Studio Code](https://code.visualstudio.com/)
    - [Node.js](https://nodejs.org/)
2. Fork the repository
3. In a terminal

    ```sh
    # fork and clone the repository
    git clone git@github.com:<YOUR-FORK>/VSpaceCode.git
    cd VSpaceCode

    # Install the dependencies
    npm install

    # Open in VSCode
    code .
    ```

4. Install [TypeScript + Webpack Problem Matchers for VS Code](https://marketplace.visualstudio.com/items?itemName=eamodio.tsl-problem-matcher)
5. Go to debug tab select `Run Extension`

## Submitting Issues

Feel free to open an issue if the issue you are experiencing is not in already in the [Github issues](https://github.com/VSpaceCode/VSpaceCode/issues).

## Submitting Pull Requests

If you are submitting an pull request (PR) without a tracking issue, consider create an issue first. This is so that we can discuss different implementations if necessary.
