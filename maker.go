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

func TemplateExecuteArray(data interface{}, tmpl string, TemplateName string) string {
	funcMap := template.FuncMap{
		"ToLover": strings.ToLower,
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
