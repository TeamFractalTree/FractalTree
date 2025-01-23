<div align="center">
  <a href="https://github.com/TeamFractalTree/FractalTree">
    <img src="https://github.com/user-attachments/assets/2bef1f57-14d4-482f-86fd-730f56efd545" alt="Fractal Tree Logo" width="100%">
  </a>

  <h3 align="center">Fractal Tree</h3>
  <p align="center">
    Bridging the digital divide, dive into the world of coding with just a pen, paper, and a smartphone! 
    <br />
    <br />
    <a href="https://app.fractal-tree.org">Web Version</a>
    ·
    <a href="https://app.fractal-tree.org">Android App</a>
  </p>

  ![GitHub License](https://img.shields.io/github/license/TeamFractalTree/FractalTree)
  ![GitHub repo size](https://img.shields.io/github/repo-size/TeamFractalTree/FractalTree)
  ![Website](https://img.shields.io/website?url=https%3A%2F%2Fapp.fractal-tree.org)
</div>

# The Problem

In crisis-affected areas, millions of children lack access to quality education, especially in computer science—a critical skill for the future. Language barriers, bad internet, and limited access to laptops and computers make learning coding even more difficult.

# The Solution

Our platform fills this gap by providing a multilingual, offline-capable app teaching programming skills in dozens of languages and multiple coding languages to ensure no child is left behind. All you need is a pen, paper, and a smartphone.

Our platform bridges the digital divide with:
- A scanner that transcribes handwritten code for easy editing, running and sharing
- Interactive lessons in a variety of coding languages
- Support for dozens of spoken languages to break regional barriers
- A space to create, share, and run projects in a safe and secure environment
Although people can run code on their phones already with existing solutions like replit, and typing using an on-screen keyboard, it is much more efficient to write down code on paper and scan it.
The ability to use it offline ensures students can learn uninterrupted, even in low-connectivity areas.

# Installation

Fractal Tree was primarily designed for Android, we highly recommend trying it using an Android phone, however you may access it using a laptop, tablet, or desktop.

> Fractal Tree is **NOT** supported on iPhones

*Remember, the entire point of Fractal Tree is for people who can't afford laptops (and subsequently can't afford iPhones) to be able to code.*

> Note that the web version does not support any offline functionality

## Install On Android (Highly Recommended)
1. Download the latest release of Fractal Tree, this will give you an installable .apk file
2. Open the .apk file, a warning may pop up, you will have to allow installation from unknown sources
3. Once you give permissions to your browser, you can follow the instructions on screen to install the app

## Access From A Laptop, Desktop, Or Tablet (**NOT** an iPhone)

Simply go to https://app.fractal-tree.org/  
Note that the app will run in a phone frame, since we don't support a horizontal layout.

# Compiling The Project

We have a hosted instance at [app.fractal-tree.org](https://app.fractal-tree.org), however if you want to compile it yourself here's how:

## Compile The Frontend

> IMPORTANT: You must point the frontend to the URL of your backend, *your backend must use HTTPS*
>
> You can do this by modifying `FractalTree.Frontend/src/BaseURL.js` to `export default "https://api.example.com";` (do NOT add a trailing slash)

```bash
cd FractalTree.Frontend
npm i --force
npm run dev
```

## Compile The Backend

> Note: This assumes you have Visual Studio 2022, linux and macOS users have to use dotnet cli and docker cli

1. Create a .env file in FractalTree.Backend/FractalTree.Backend.API
2. Add a key called `OPENAI_KEY` to the file like `OPENAI_KEY=sk-proj-blahblahlowtaperfade`
3. Now simply open the solution in VS and compile the docker container
4. You must run the container behind an SSL proxy

## Compile The Lessons

The lessons in FractalTree.Lessons must be compiled from markdown to JavaScript, here's how:

```bash
cd FractalTree.Frontend
npm run lessons
```

## Compile The Mobile App

Please refer to the [tauri docs](https://v2.tauri.app/develop/)

![image](https://github.com/user-attachments/assets/25175d8d-8a52-4d28-969e-708b4f60a26b)

