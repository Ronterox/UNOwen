function watch() {
    const ws = new WebSocket("ws://localhost:8080/ws");
    ws.onopen = () => { ws.send("Ricardo"); };
    ws.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        if (event.data === "update") location.reload();
    };
    ws.onclose = () => { console.log("WebSocket closed"); };
    ws.onerror = (event) => { console.error("WebSocket error observed:", event); }
}

export { watch }; // This file is a module, so it needs to be in strict mode
