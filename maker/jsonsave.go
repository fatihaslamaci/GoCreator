package maker

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"os"
)

func GetProject(uid string) TProject {

	var r = TProject{}
	projects := JsonProjeOku()
	for i := 0; i < len(projects); i++ {
		if projects[i].Uid == uid {
			r = projects[i]
			break
		}
	}
	return r
}

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
	os.MkdirAll("./db", os.ModePerm)
	ioutil.WriteFile("./db/projeler.json", out.Bytes(), 0644)

}

func JsonTableKaydet(projeler []TDataTable, path string) {

	b, _ := json.Marshal(projeler)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")
	os.MkdirAll(path+"/gocreator/db", os.ModePerm)
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
	os.MkdirAll(path+"/gocreator/db", os.ModePerm)
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
	os.MkdirAll(path+"/gocreator/db", os.ModePerm)
	ioutil.WriteFile(path+"/gocreator/db/EndPoint.json", out.Bytes(), 0644)

}

func JsonEndPointOku(path string) []TEndPoint {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/EndPoint.json")
	var r []TEndPoint
	_ = json.Unmarshal(dat, &r)

	return r
}

func JsonQueryOku(path string) []TQuery {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/Query.json")
	var r []TQuery
	_ = json.Unmarshal(dat, &r)

	return r
}
