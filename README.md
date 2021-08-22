# Boot Chain

This repository is a simple setup of a **Genetic Chain** project.  It's here to
help get you up and running quickly and as smoothly as possible.  If you
encounter any hiccups or have an issues please let us know so we can make
it better for the next dev.

The assumption is, you are a semi-experienced developer.  This readme will walk
you through the project setup assuming you understand web development to a
certain degree.  It assumes you are familiar with running commands in a shell.

This project repo was only tested on osx but should also work in linux.  Not
sure about windows.

## Project Overview

The project is broken down into a few pieces to make development smoother.
Initially it's a little more work learning it all, but iteration will be much
much faster and this prevents every single project applicant from doing the
same setup.  Please modify and change it fix your needs.  This is just an
example setup papaver uses for his own needs.

### Environment

The `.env` file contains the environment setup.  It can be loaded using:

    . .env

All it currently does is extend the PATH variable so we can run gulp which
is installed by node.

### Makefile

The makefile holds various targets and commands to setup the repo as well
as build the source files for your project.  A unified place for
commands so you don't have to remember how to use a dozen different tools.

### Gulp

Gulp is a simple task runner used to compile and distribute the source code.

### App Directory

This folder is where your testing application lives.  This folder mimics the
setup on the **Genetic Chain** backend which will be automatically running your art
scripts and displaying your art.  It is just a simple html site with one html
page and a few javascript links.

#### index.html

Very very simple page.  Only a body with links to some styles and javascript.
When your art loads it should create a canvas and attach it to the body.  Any
controls used for updating the state can be added in this file.

#### index.css

Very vey simple style page.  Only tries to maximize the body in the available
window space.

#### boot.js

This is the global state that will be injected into your app.  These variables
are important.

**tokenData** will hold the hash generated for the token as well as the project
and token id if you need it.  The boot script is currently setup to generate a
random 64 character hash per load.

**tokenState** will hold the stateful traits for your token.  Note that only int,
string, and bools are supported on the chain.  If you need to work with floats
you will need to convert them from strings.

You are welcome to have as much or little state as you wish, but we ask that
each project have at least one trait which the token owner can tweak to allow
them the power to customize your art work.

#### dist

This will contain the final distribution build for your art.  There will be three
files generated for you.  **art.js** will contain the script that will run
to generate your art.  **min/art.js** will be exactly the same thing but minified
to save you money when you deploy to the chain.  Each byte deployed to the chain costs
money so its important to be efficient here.  Lastly the **metadata.js** file
will contain a function to convert the token hash into your art's traits.

### Src Directory

This contains the source code of your art script broken down into three files
to make life easier in the long run.


#### **traits.js**

Contains a function which takes in a token hash and converts it into traits
used later to render your art.

There are a bunch of functions in here for your convenience.  Several
randomization functions are included so you don't have to write them from scratch.
The functions generate pseudo random data so the results are random but still
determinsitic. Pure randomization would lead to unknown results each time the
script runs to generate your art.

#### **art.js**

Includes the code used to generate/render your art.  There are a few things to
note in this file.  Nothing is set in stone on how this file works.  Modify it
as you need but keep a few things in mind.

At the bottom you will notice the `window.onload` is set to kick of the script.
This is the entry point into the program.  This just calls the `run` function
which creates the canvas and renders the art.

You may create the canvas however you like.  If you are using a library like
*three.js* or *processing* these library may create the canvas for you.

You'll see the `doArt` function is broken down into a few steps.

Firstly the conversion of the hash into traits.  This is not necessary but
helps later when you want to to display your art's traits on the platform
and on OpenSea.  Remember OpenSea parses these traits and lists
their rarities.

Since this project has animation, the render and update functions are both
filled out.  The main reasoning for this split is it allows an external
application (like the dapp which will be used to change your art state) to
take control of the rendering and updating.  This is also why we attach it to
the canvas and setup the render loop at the very end.

You may certainly change how this works if you need, but realize the farther from
this setup your script goes the more work it will be to required to build the
supporting dapp for it.

#### **metadata.js**

Holds the function which converts your traits and token state into metadata which
can be ingested by the backend platform.  If you want to display traits of your
artwork on opensea and the genetic chain platform this function is very important.
The signature and name must be the same for the backend to correctly use it.

### Libs Directory

We currently suppport a couple major libraries.  If you would like to use a
library we have not listed, please reach out to us and we'll try to accomadate.
Example setups are included for some libraries.  Just copy the respective
`art.{library}.js` to `art.js` and run `make`.  Please only use the library versions
included in the repo as we need to be able reproduce all the projects exactly.
If you need a newer or older version of a library please reach out.

- [ThreeJs](https://threejs.org/)
- [ProcessingJs](https://p5js.org/)

## Running the Project

Make sure to always load the environment file before running any scripts.

### Initial Setup

Initial setup of the project only requires running `make npm-setup`.  You only
have to run this once, which installs the **gulp** tools which are used to
build the final source code.

### Building

Running `make` will build the source into the `app/dist` folder.

Running `make watch` will kick of a task watching for code changes and auto
rebuilding your source.

This app is a simple working example with traits and state to play with.
Enjoy.  We look forward to seeing your creations.

### Running

Open up `app/index.html` in a browser and you should be up and running!

## Project Submission

Until the submission process is automated please just email us the app folder
zipped up.  We're working on automating the submission process so you'll be able
to do it right through this repo in the future.

The two important files are **min/art.js** and **metadata.js**.  However having a
fully working setup helps as well since it gives us an idea how your state should
work and is setup.
