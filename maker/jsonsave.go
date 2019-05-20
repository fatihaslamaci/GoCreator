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

func JsonEndPointKaydet(value TEndPointList, path string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")
	os.MkdirAll(path+"/gocreator/db", os.ModePerm)
	ioutil.WriteFile(path+"/gocreator/db/EndPoint.json", out.Bytes(), 0644)

}

func JsonEndPointOku(path string) TEndPointList {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/EndPoint.json")
	var r TEndPointList
	_ = json.Unmarshal(dat, &r)

	return r
}

func GetTable(tables []TDataTable, tableName string) TDataTable {

	var r TDataTable

	for i := 0; i < len(tables); i++ {
		if tables[i].Name == tableName {
			r = tables[i]
			break
		}
	}

	return r

}

func GetQueryFiled(fields []TQueryField, Name string) TQueryField {
	var r TQueryField

	for i := 0; i < len(fields); i++ {
		if fields[i].Name == Name {
			r = fields[i]
			break
		}
	}

	return r
}

func JsonQueryOku(path string) []TQuery {
	dat, _ := ioutil.ReadFile(path + "/gocreator/db/Query.json")
	var r []TQuery
	var temp []TQuery
	_ = json.Unmarshal(dat, &temp)

	tables := JsonTableOku(path)

	for i := 0; i < len(temp); i++ {
		q := TQuery{}
		q.Name = temp[i].Name
		q.Parameters = temp[i].Parameters
		q.QueryEnd = temp[i].QueryEnd

		for j := 0; j < len(temp[i].Tables); j++ {

			t := GetTable(tables, temp[i].Tables[j].Name)

			if t.Name == "" {

			} else {

				qt := TQueryTable{}
				qt.Name = temp[i].Tables[j].Name
				qt.Join = temp[i].Tables[j].Join
				qt.JoinOn = temp[i].Tables[j].JoinOn
				q.Tables = append(q.Tables, qt)

				for k := 0; k < len(t.Fields); k++ {

					field := TQueryField{}
					field.Name = t.Fields[k].Name
					field.FieldType = t.Fields[k].FieldType

					tf := GetQueryFiled(temp[i].Tables[j].Fields, t.Fields[k].Name)

					if tf.Name == t.Fields[k].Name {
						field.Selected = tf.Selected
					}

					q.Tables[j].Fields = append(q.Tables[j].Fields, field)
				}
			}
		}
		r = append(r, q)

	}

	return r
}

func JsonQueryKaydet(value []TQuery, path string) {

	b, _ := json.Marshal(value)
	var out bytes.Buffer
	json.Indent(&out, b, "", "\t")
	os.MkdirAll(path+"/gocreator/db", os.ModePerm)
	ioutil.WriteFile(path+"/gocreator/db/Query.json", out.Bytes(), 0644)

}
