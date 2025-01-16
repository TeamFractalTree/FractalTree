function Main() {
  return (
    <div class="space-y-3 px-8">
      <h1>Addition Calculator</h1>
      <input id="1" className="w-full" type="number" />
      <p class="text-center">+</p>
      <input id="2" className="w-full" type="number" />
      <button class="bg-blue-400" onClick={() => {
        let v1 = parseInt($("#1").val());
        let v2 = parseInt($("#2").val());
        alert(v1 + v2);
      }}>
        Go
      </button>
    </div>
  )
}