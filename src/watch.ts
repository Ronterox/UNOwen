let timeout: number = 0;
const BACKOFF = 500;

function watch() {
    const ws = new WebSocket(`ws://${location.host}/ws`);

    ws.onopen = () => { 
        ws.send("Ricardo"); 
        timeout = 0;
    };

    ws.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        if (event.data === "update") location.reload();
    };

    ws.onclose = () => { 
        console.log("WebSocket closed"); 
        setTimeout(() => { watch(); }, 1000 + timeout * BACKOFF);
        timeout++;
    };

    ws.onerror = (event) => { console.error("WebSocket error observed:", event); }
}

export { watch }; // This file is a module, so it needs to be in strict mode
