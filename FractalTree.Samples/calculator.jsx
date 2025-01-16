// This file will only work in Fractal Tree, don't run it standalone

function Main() {
  const [result, setResult] = React.useState("");

  const handleClick = (e) => {
    setResult(result.concat(e.target.id));
  };

  const clear = () => {
    setResult("");
  };

  const deleteElement = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (error) {
      setResult("Invalid");
    }
  };

  return (

      <div class="w-full h-screen relative overflow-hidden">
        <div class="w-full h-1/5 bg-gray-700 flex items-end text-right">
          <div class="w-full py-5 px-6 text-6xl text-white">{result}</div>
        </div>
        <div class="w-full flex flex-col bg-pink-500 h-4/5">
          <div class="flex w-full h-full">
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button onClick={clear} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light">C</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button onClick={deleteElement} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light">DEL</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button onClick={() => alert("Calculator sample project, built with Fractal Tree")} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light">&#9432;</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="/" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-pink-700 bg-opacity-10 hover:bg-opacity-20 text-white text-2xl font-light">/</button>
            </div>
          </div>
          <div class="flex w-full h-full">
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="7" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">7</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="8" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">8</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="9" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">9</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="*" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-pink-700 bg-opacity-10 hover:bg-opacity-20 text-white text-xl font-light">*</button>
            </div>
          </div>
          <div class="flex w-full h-full">
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="4" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">4</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="5" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">5</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="6" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">6</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="-" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-pink-700 bg-opacity-10 hover:bg-opacity-20 text-white text-xl font-light">-</button>
            </div>
          </div>
          <div class="flex w-full h-full">
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="1" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">1</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="2" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">2</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="3" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">3</button>
            </div>
            <div class="w-1/4 border-r border-b border-pink-400 h-full">
              <button id="+" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-pink-700 bg-opacity-10 hover:bg-opacity-20 text-white text-xl font-light">+</button>
            </div>
          </div>
          <div class="flex w-full h-full">
            <div class="w-1/4 border-r border-pink-400">
              <button id="0" onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">0</button>
            </div>
            <div class="w-1/4 border-r border-pink-400">
              <button id="." onClick={handleClick} class="w-full h-full outline-none focus:outline-none bg-transparent hover:bg-pink-400 hover:bg-opacity-20 text-white text-xl font-light">.</button>
            </div>
            <div class="w-2/4 border-r border-pink-400">
              <button id="=" onClick={calculate} class="w-full h-full outline-none focus:outline-none bg-pink-700 bg-opacity-30 hover:bg-opacity-40 text-white text-xl font-light">=</button>
            </div>
          </div>
        </div>
      </div>
  );
}