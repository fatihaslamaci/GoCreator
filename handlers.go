package main

import (
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func getTablesHandler(w http.ResponseWriter, r *http.Request) {

	projectId := r.Header.Get("projectId")

	a := JsonTableOku(projectId)

	_ = json.NewEncoder(w).Encode(a)
}

func getProxyClassHandler(w http.ResponseWriter, r *http.Request) {

	projectId := r.Header.Get("projectId")

	a := JsonProxyClassOku(projectId)

	_ = json.NewEncoder(w).Encode(a)
}

func getEndPointHandler(w http.ResponseWriter, r *http.Request) {

	projectId := r.Header.Get("projectId")

	a := JsonEndPointOku(projectId)

	_ = json.NewEncoder(w).Encode(a)
}

func saveEndPointHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var model []TEndPoint
	err = json.Unmarshal(body, &model)
	if err != nil {
		panic(err)
	}

	JsonEndPointKaydet(model, r.Header.Get("projectId"))

	_ = json.NewEncoder(w).Encode(model)

}

func saveTablesHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var project []TDataTable
	err = json.Unmarshal(body, &project)
	if err != nil {
		panic(err)
	}

	for i := 0; i < len(project); i++ {
		if project[i].Uid == "" {
			project[i].Uid = uuid.New().String()
		}
	}

	JsonTableKaydet(project, r.Header.Get("projectId"))

	_ = json.NewEncoder(w).Encode(project)

}

func saveProxyClassHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var model []TProxyClass
	err = json.Unmarshal(body, &model)
	if err != nil {
		panic(err)
	}

	JsonProxyClassKaydet(model, r.Header.Get("projectId"))

	_ = json.NewEncoder(w).Encode(model)

}

func getProject(uid string) TProject {

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

func prgFormat(path string, w http.ResponseWriter) {

	cmd := "go fmt " + path + "/*.go"

	_, _ = fmt.Fprintf(w, "$: "+cmd+"\n")
	err, out, errout := Shellout(path, "bash", "-c", cmd)
	if err != nil {
		_, _ = fmt.Fprintf(w, "error: %v\n", err)
	}

	if len(out) > 0 {
		_, _ = fmt.Fprintf(w, out)
	}
	if len(errout) > 0 {
		_, _ = fmt.Fprintf(w, errout)

	}

}

func prgBuild(path string, w http.ResponseWriter) {

	cmd := "go build "

	_, _ = fmt.Fprintf(w, "$: "+cmd+"\n")
	//err, out, errout := Shellout(path,"go", "build", path+"/main.go")
	err, out, errout := Shellout(path, "go", "build")

	if err != nil {
		_, _ = fmt.Fprintf(w, "error: %v\n", err)
	}

	if len(out) > 0 {
		fmt.Fprintf(w, out)
	}
	if len(errout) > 0 {
		fmt.Fprintf(w, errout)
	}

}

func buildHandler(w http.ResponseWriter, r *http.Request) {

	// Kill it:

	if c.Process != nil {
		if err := c.Process.Kill(); err != nil {
			log.Fatal("failed to kill process: ", err)
		}
	}
	projectId := r.Header.Get("projectId")
	project := getProject(projectId)
	PrgDir = project.Path

	os.MkdirAll(project.Path, os.ModePerm)
	Copy("deneme.gohtml", (project.Path + "/main.go"))

	prgFormat(project.Path, w)
	prgBuild(project.Path, w)

	tables := JsonTableOku(projectId)
	proxyclass := JsonProxyClassOku(projectId)

	TamplateFile := "InitDB_oto.gohtml"
	HedefeKaydet(tables, (project.Path + "/InitDB.go"), ("./templates/" + TamplateFile), TamplateFile)

	TamplateFile = "struct_oto.gohtml"
	HedefeKaydet(tables, (project.Path + "/" + "struct_oto.go"), ("./templates/" + TamplateFile), TamplateFile)

	TamplateFile = "crud_oto.gohtml"
	HedefeKaydet(tables, (project.Path + "/" + "crud_oto.go"), ("./templates/" + TamplateFile), TamplateFile)

	TamplateFile = "proxyclass_oto.gohtml"
	HedefeKaydet(proxyclass, (project.Path + "/" + "proxyclass_oto.go"), ("./templates/" + TamplateFile), TamplateFile)

	//json.NewEncoder(w).Encode(project)

}

func getProjecthandler(w http.ResponseWriter, r *http.Request) {
	goprojects := JsonProjeOku()
	json.NewEncoder(w).Encode(goprojects)
}

func saveProjectHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var project TProject
	err = json.Unmarshal(body, &project)
	if err != nil {
		panic(err)
	}

	project.Uid = uuid.New().String()
	//project.Ad= "Deneme"

	goprojects := JsonProjeOku()
	goprojects = append(goprojects, project)
	JsonProjeKaydet(goprojects)

	json.NewEncoder(w).Encode(goprojects)

}
