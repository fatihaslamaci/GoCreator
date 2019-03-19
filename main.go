package main

import (
	"bufio"
	"fmt"
	"os/exec"
	"path"
	"sync"

	//"strings"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

//var goprojects []TProject

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var PrgDir = "/home/fatih/go/src/CariTakipTest"

var c = exec.Command(PrgDir + "/main")

func main() {
	fmt.Println("Start :", time.Now())

	gotables := []TDataTable{}

	{
		table := TDataTable{}
		table.Ad = "CariHesap"
		table.Fields = append(table.Fields, TDataField{Name: "ID", PrimaryKey: true, DataType: "int64"})
		table.Fields = append(table.Fields, TDataField{Name: "Unvan", DataType: "string", Size: 150})
		table.Fields = append(table.Fields, TDataField{Name: "KrediLimit", DataType: "float32"})

		gotables = append(gotables, table)
	}
	{
		table := TDataTable{}
		table.Ad = "CariHereket"
		table.Fields = append(table.Fields, TDataField{Name: "ID", PrimaryKey: true, DataType: "int64"})
		table.Fields = append(table.Fields, TDataField{Name: "Tarih", DataType: "time.Time"})
		table.Fields = append(table.Fields, TDataField{Name: "Aciklama", DataType: "string", Size: 50})
		table.Fields = append(table.Fields, TDataField{Name: "Tutar", DataType: "float64"})

		gotables = append(gotables, table)
	}

	JsonTableKaydet(gotables, "58e8ea5d-4551-4129-91ec-9d6cec7bb95e")

	//aaa:= JsonTableOku()

	//goprojects = append(goprojects, GoProject{Uid: "1", Ad: "John1"})

	//goprojects = JsonProjeOku()

	//os.MkdirAll("/home/fatih/go/src/goprj", os.ModePerm)
	//Copy("deneme.gotmp", "/home/fatih/go/src/goprj/main.go")
	//***********************

	http.HandleFunc("/api/getProject", getProjecthandler)
	http.HandleFunc("/api/saveProject", saveProjectHandler)
	http.HandleFunc("/api/getTables", getTablesHandler)
	http.HandleFunc("/api/saveTables", saveTablesHandler)
	http.HandleFunc("/api/build", buildHandler)

	http.HandleFunc("/echo", socketHandler)

	http.Handle("/", http.FileServer(http.Dir("./static")))

	http.ListenAndServe(":8080", nil)

}

func socketHandler(w http.ResponseWriter, r *http.Request) {

	conn, _ := upgrader.Upgrade(w, r, nil) // error ignored for sake of simplicity

	for {
		// Read message from browser
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}

		if string(msg[:]) == "build" {

			c = exec.Command(PrgDir + "/" + path.Base(PrgDir))
			c.Dir = PrgDir

			if err := conn.WriteMessage(msgType, []byte("$: "+path.Base(PrgDir))); err != nil {
				return
			}

			r, _ := c.StdoutPipe()
			if err := c.Start(); err != nil {
				if err := conn.WriteMessage(msgType, []byte("error : "+err.Error())); err != nil {
					return
				}
			}

			var wg sync.WaitGroup
			wg.Add(1)
			go func() {
				s := bufio.NewScanner(r)
				for s.Scan() {
					if err := conn.WriteMessage(msgType, []byte(s.Text())); err != nil {
						return
					}
				}
				wg.Done()
			}()
			wg.Wait()
		}

	}

}
