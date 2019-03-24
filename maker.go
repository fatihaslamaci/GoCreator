package main

import (
	"bytes"
	"os"
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

func TemplateExecuteArray(data interface{}, tmpl string, TemplateName string) string {
	funcMap := template.FuncMap{
		"ToLover":         strings.ToLower,
		"SQLiteDataType":  SQLiteDataType,
		"IdName":          IdName,
		"StructFieldType": StructFieldType,
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
	fhedef, err := os.Create(hedefFile)
	check(err)
	defer fhedef.Close()
	s := TemplateExecuteArray(data, TemplateFile, TemplateName)

	WriteString(fhedef, s)
	fhedef.Sync()
}
