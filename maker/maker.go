package maker

import (
	"bytes"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"text/template"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

var FieldMap = map[string]string{
	"bool":      "NUMERIC",
	"string":    "TEXT",
	"int32":     "INTEGER",
	"int64":     "INTEGER",
	"float32":   "REAL",
	"float64":   "REAL",
	"[]byte":    "BLOB",
	"time.Time": "NUMERIC",
}

var FieldMapNull = map[string]string{
	"bool":      "null.Bool",
	"string":    "null.String",
	"int32":     "null.Int",
	"int64":     "null.Int",
	"float32":   "null.Float",
	"float64":   "null.Float",
	"[]byte":    "[]byte",
	"time.Time": "null.Time",
}

func SQLiteDataType(field TDataField) string {

	r := FieldMap[field.FieldType]

	if field.PrimaryKey {
		r += " PRIMARY KEY AUTOINCREMENT"
	}

	return r
}

func IdName(table TDataTable) string {

	r := "id"

	for _, item := range table.Fields {
		if item.PrimaryKey {
			r = item.Name
		}
	}

	return r

}

func StructFieldType(field TDataField) string {

	r := field.FieldType

	if field.Nullable {
		r = FieldMapNull[field.FieldType]
	}

	return r
}

func EndPointFieldType(field TEndPointField) string {

	r := field.FieldType

	//if field.Nullable {
	//	r = FieldMapNull[field.FieldType]
	//}

	return r
}

func ExistyField(fields []TEndPointField, fieldType string) bool {
	r := false
	for _, field := range fields {
		if field.FieldType == fieldType {
			r = true
			break
		}
	}
	return r
}

func ImportFieldEndPoint(Kartlar []TEndPoint, fieldType string, importName string) string {
	r := ""
	for _, kart := range Kartlar {
		if ExistyField(kart.Request.Fields, fieldType) {
			r = `"` + importName + `"`
			break
		}
		if ExistyField(kart.Response.Fields, fieldType) {
			r = `"` + importName + `"`
			break
		}
	}
	return r
}

func TemplateExecuteArray(data interface{}, tmpl string, TemplateName string) string {
	funcMap := template.FuncMap{
		"ToLover":             strings.ToLower,
		"SQLiteDataType":      SQLiteDataType,
		"IdName":              IdName,
		"StructFieldType":     StructFieldType,
		"EndPointFieldType":   EndPointFieldType,
		"ImportFieldEndPoint": ImportFieldEndPoint,
	}

	t := template.Must(template.New(TemplateName).Funcs(funcMap).ParseFiles(tmpl))
	var tpl bytes.Buffer
	err := t.Execute(&tpl, data)
	if err != nil {
		panic(err)
	}
	return tpl.String()
}

func WriteString(fhedef *os.File, s string) {

	//Boş satırları silmek için regex
	regex, err := regexp.Compile(`(?m)^\s*$[\r\n]*|[\r\n]+\s+\z`)
	check(err)
	s2 := regex.ReplaceAllString(s, "")
	_, err = fhedef.WriteString(s2)
	check(err)
}

func HedefeKaydet(data interface{}, hedefFile string, TemplateFile string, TemplateName string) {
	s := TemplateExecuteArray(data, TemplateFile, TemplateName)
	fhedef, err := os.Create(hedefFile)
	defer fhedef.Close()
	check(err)
	WriteString(fhedef, s)
	fhedef.Sync()

}

func HedefeKaydetEgerDosyaYoksa(data interface{}, hedefFile string, TemplateFile string, TemplateName string) {

	if FileExists(hedefFile) == false {
		HedefeKaydet(data, hedefFile, TemplateFile, TemplateName)
	}
}

func FileExists(name string) bool {
	if _, err := os.Stat(name); err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return true
}

func MakeProject(ProjectId string, templateDir string) TProject {
	project := GetProject(ProjectId)
	PrgDir := project.Path
	os.MkdirAll(project.Path+"/gocreator/db", os.ModePerm)
	tables := JsonTableOku(PrgDir)

	templateFileDir := "./templates/" + templateDir + "/"

	//proxyclass := JsonProxyClassOku(PrgDir)
	endpoint := JsonEndPointOku(PrgDir)
	TamplateFile := "main.gohtml"
	HedefeKaydetEgerDosyaYoksa(filepath.Base(project.Path), (project.Path + "/main.go"), (templateFileDir + TamplateFile), TamplateFile)
	if len(tables) > 0 {
		TamplateFile = "InitDB_oto.gohtml"
		HedefeKaydet(tables, (project.Path + "/gocreator/InitDB.go"), (templateFileDir + TamplateFile), TamplateFile)

		TamplateFile = "entity_oto.gohtml"
		HedefeKaydet(tables, (project.Path + "/gocreator/" + "entity_oto.go"), (templateFileDir + TamplateFile), TamplateFile)

		TamplateFile = "crud_oto.gohtml"
		HedefeKaydet(tables, (project.Path + "/gocreator/" + "crud_oto.go"), (templateFileDir + TamplateFile), TamplateFile)
	}
	if len(endpoint.EndPoints) > 0 {

		TamplateFile = "proxyclass_oto.gohtml"
		HedefeKaydet(endpoint, (project.Path + "/gocreator/" + "proxyclass_oto.go"), (templateFileDir + TamplateFile), TamplateFile)

		TamplateFile = "handler_oto.gohtml"
		HedefeKaydet(endpoint, (project.Path + "/gocreator/" + "handler_oto.go"), (templateFileDir + TamplateFile), TamplateFile)

		for i := 0; i < len(endpoint.EndPoints); i++ {
			TamplateFile = "handlerMap.gohtml"
			HedefFileName := project.Path + "/gocreator/" + "handlerMap_" + endpoint.EndPoints[i].Name + ".go"
			HedefeKaydetEgerDosyaYoksa(endpoint.EndPoints[i], HedefFileName, (templateFileDir + TamplateFile), TamplateFile)

		}
	}

	query := JsonQueryOku(PrgDir)
	if len(query) > 0 {
		TamplateFile = "query_oto.gohtml"
		HedefeKaydet(query, (project.Path + "/gocreator/query_oto.go"), (templateFileDir + TamplateFile), TamplateFile)
	}

	return project
}
