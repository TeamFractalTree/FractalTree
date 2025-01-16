function Main() {
    return (
        <div class="space-y-3 px-8">
            <h1>Addition Calculator</h1>
            <input id="1" className="w-full" type="number"/>
            <p class="text-center">+</p>
            <input id="2" className="w-full" type="number"/>
            <button class="bg-blue-400">Go</button>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Main/>
)
