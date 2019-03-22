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

func JsonProxyClassKaydet(value []TProxyClass, uuid string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	os.MkdirAll("./db/"+uuid, os.ModePerm)

	ioutil.WriteFile("./db/"+uuid+"/ProxyClass.json", out.Bytes(), 0644)

}

func JsonProxyClassOku(uuid string) []TProxyClass {
	dat, _ := ioutil.ReadFile("./db/" + uuid + "/ProxyClass.json")
	var r []TProxyClass
	_ = json.Unmarshal(dat, &r)

	return r
}

func JsonEndPointKaydet(value []TEndPoint, uuid string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	os.MkdirAll("./db/"+uuid, os.ModePerm)

	ioutil.WriteFile("./db/"+uuid+"/EndPoint.json", out.Bytes(), 0644)

}

func JsonEndPointOku(uuid string) []TEndPoint {
	dat, _ := ioutil.ReadFile("./db/" + uuid + "/EndPoint.json")
	var r []TEndPoint
	_ = json.Unmarshal(dat, &r)

	return r
}
