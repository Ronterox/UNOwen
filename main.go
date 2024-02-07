package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)

func handleWebsocket(w http.ResponseWriter, r *http.Request) {
	wgUpgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	conn, err := wgUpgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
	}

	clients[conn] = true

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}

		fmt.Println("Received message: ", string(message))

		err = conn.WriteMessage(messageType, []byte("Hello, "+string(message)+"!"))
		if err != nil {
			fmt.Println(err)
			return
		}
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("src")))
	http.HandleFunc("/ws", handleWebsocket)

	// Check if change in file dir

	files, err := os.ReadDir("src")
	if err != nil {
		fmt.Println(err)
	}

	lastFileModTime := make(map[string]time.Time)

	for _, file := range files {
		info, err := file.Info()
		if err != nil {
			fmt.Println(err)
		}
		lastFileModTime[file.Name()] = info.ModTime()
	}

	go func() {
		for {
			time.Sleep(1 * time.Second)
			modifed := false
			for _, file := range files {
				info, err := file.Info()
				if err != nil {
					fmt.Println(err)
				}

				modTime := info.ModTime()
				if fileName := file.Name(); modTime != lastFileModTime[fileName] {
					fmt.Println("File changed: ", fileName)
					lastFileModTime[fileName] = modTime
					modifed = true
				}
			}
			if modifed {
				for client := range clients {
					err := client.WriteMessage(websocket.TextMessage, []byte("update"))
					if err != nil {
						fmt.Println(err)
						client.Close()
						delete(clients, client)
					}
				}
			}
		}
	}()

	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
