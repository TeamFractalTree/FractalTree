# Fractal Tree
Bridging the digital divide, dive into the world of coding with just a pen, paper, and a smartphone! 

![GitHub License](https://img.shields.io/github/license/TeamFractalTree/FractalTree)
![GitHub repo size](https://img.shields.io/github/repo-size/TeamFractalTree/FractalTree)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fapp.fractal-tree.org)


## Compiling The Project

We have a hosted instance at [app.fractal-tree.org](https://app.fractal-tree.org), however if you want to compile it yourself here's how:

### Compile The Frontend
```bash
cd FractalTree.Frontend
npm i --force
npm run dev
```

### Compile The Backend

> Note: This assumes you have Visual Studio 2022, linux and macOS users have to use dotnet cli and docker cli

1. Create a .env file in FractalTree.Backend/FractalTree.Backend.API
2. Add a key called `OPENAI_KEY` to the file like `OPENAI_KEY=sk-proj-blahblahlowtaperfade`
3. Now simply open the solution in VS and compile the docker container
4. You must run the container behind an SSL proxy

### Compile The Lessons

The lessons in FractalTree.Lessons must be compiled from markdown to JavaScript, here's how:

```bash
cd FractalTree.Frontend
npm run lessons
```

### Compile The Android App

```bash
cd FractalTree.Frontend
npm run build-android
```
