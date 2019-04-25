package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
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

func JsonTableKaydet(projeler []TDataTable, path string) {

	b, _ := json.Marshal(projeler)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	err := ioutil.WriteFile(path+"/gocreator/db/Tables.json", out.Bytes(), 0644)
	if err != nil {
		panic(err)
	}

}

func JsonTableOku(path string) []TDataTable {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/Tables.json")
	var projeler []TDataTable
	_ = json.Unmarshal(dat, &projeler)

	return projeler
}

func JsonProxyClassKaydet(value []TProxyClass, path string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	ioutil.WriteFile(path+"/gocreator/db/ProxyClass.json", out.Bytes(), 0644)

}

func JsonProxyClassOku(path string) []TProxyClass {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/ProxyClass.json")
	var r []TProxyClass
	_ = json.Unmarshal(dat, &r)

	return r
}

func JsonEndPointKaydet(value []TEndPoint, path string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")

	ioutil.WriteFile(path+"/gocreator/db/EndPoint.json", out.Bytes(), 0644)

}

func JsonEndPointOku(path string) []TEndPoint {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/EndPoint.json")
	var r []TEndPoint
	_ = json.Unmarshal(dat, &r)

	return r
}
