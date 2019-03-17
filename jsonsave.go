package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"os"
)

func JsonProjeOku() []TProject {
	dat, _ := ioutil.ReadFile("./db/projeler.json")
	var projeler []TProject
	_ = json.Unmarshal(dat, &projeler)

	return projeler
}

func JsonProjeKaydet(projeler []TProject) {

	b, _ := json.Marshal(projeler)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")
	ioutil.WriteFile("./db/projeler.json", out.Bytes(), 0644)

}

func JsonTableKaydet(projeler []TDataTable, uuid string) {

	b, _ := json.Marshal(projeler)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	os.MkdirAll("./db/"+uuid, os.ModePerm)

	ioutil.WriteFile("./db/"+uuid+"/Tables.json", out.Bytes(), 0644)

}

func JsonTableOku(uuid string) []TDataTable {
	dat, _ := ioutil.ReadFile("./db/" + uuid + "/Tables.json")
	var projeler []TDataTable
	_ = json.Unmarshal(dat, &projeler)

	return projeler
}
