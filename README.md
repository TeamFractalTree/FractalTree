<div align="center">
  <a href="https://github.com/TeamFractalTree/FractalTree">
    <img src="./FractalTree.Frontend/public/Images/FractalTreeWordMark.png" alt="Fractal Tree Logo" height="80">
  </a>

  <h3 align="center">Fractal Tree</h3>
  <p align="center">
    Bridging the digital divide, dive into the world of coding with just a pen, paper, and a smartphone! 
    <br />
    <br />
    <a href="https://app.fractal-tree.org">Web Version</a>
    ·
    <a href="https://app.fractal-tree.org">Android App</a>
    ·
    <a href="https://app.fractal-tree.org">IOS App</a>
  </p>

  ![GitHub License](https://img.shields.io/github/license/TeamFractalTree/FractalTree)
  ![GitHub repo size](https://img.shields.io/github/repo-size/TeamFractalTree/FractalTree)
  ![Website](https://img.shields.io/website?url=https%3A%2F%2Fapp.fractal-tree.org)
</div>

## Compiling The Project

We have a hosted instance at [app.fractal-tree.org](https://app.fractal-tree.org), however if you want to compile it yourself here's how:

### Compile The Frontend

> IMPORTANT: You must point the frontend to the URL of your backend, *your backend must use HTTPS*
>
> You can do this by modifying `FractalTree.Frontend/src/BaseURL.js` to `export default "https://api.example.com";` (do NOT add a trailing slash)

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

### Compile The Mobile App

Please refer to the [tauri docs](https://v2.tauri.app/develop/)
