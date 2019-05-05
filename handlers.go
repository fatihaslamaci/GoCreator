package main

import (
	"encoding/json"
	"fmt"
	"github.com/google/uuid"
	"gocreator/maker"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
)

func getTablesHandler(w http.ResponseWriter, r *http.Request) {

	a := maker.JsonTableOku(maker.GetProject(r.Header.Get("projectId")).Path)

	_ = json.NewEncoder(w).Encode(a)
}

func getProxyClassHandler(w http.ResponseWriter, r *http.Request) {
	a := maker.JsonProxyClassOku(maker.GetProject(r.Header.Get("projectId")).Path)
	_ = json.NewEncoder(w).Encode(a)
}

func getEndPointHandler(w http.ResponseWriter, r *http.Request) {

	a := maker.JsonEndPointOku(maker.GetProject(r.Header.Get("projectId")).Path)

	_ = json.NewEncoder(w).Encode(a)
}

func saveEndPointHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var model []maker.TEndPoint
	err = json.Unmarshal(body, &model)
	if err != nil {
		panic(err)
	}

	maker.JsonEndPointKaydet(model, maker.GetProject(r.Header.Get("projectId")).Path)

	_ = json.NewEncoder(w).Encode(model)

}

func saveTablesHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var project []maker.TDataTable
	err = json.Unmarshal(body, &project)
	if err != nil {
		panic(err)
	}

	for i := 0; i < len(project); i++ {
		if project[i].Uid == "" {
			project[i].Uid = uuid.New().String()
		}
	}

	maker.JsonTableKaydet(project, maker.GetProject(r.Header.Get("projectId")).Path)

	_ = json.NewEncoder(w).Encode(project)

}

func saveProxyClassHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var model []maker.TProxyClass
	err = json.Unmarshal(body, &model)
	if err != nil {
		panic(err)
	}

	maker.JsonProxyClassKaydet(model, maker.GetProject(r.Header.Get("projectId")).Path)

	_ = json.NewEncoder(w).Encode(model)

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

func GenerateHandler(w http.ResponseWriter, r *http.Request) {

	projectId := r.Header.Get("projectId")
	project := maker.MakeProject(projectId)
	PrgDir = project.Path

	prgFormat(project.Path+"/gocreator", w)
	prgFormat(project.Path, w)

}

func buildHandler(w http.ResponseWriter, r *http.Request) {
	// Kill it:
	if c.Process != nil {
		if err := c.Process.Kill(); err != nil {
			log.Fatal("failed to kill process: ", err)
		}
	}
	projectId := r.Header.Get("projectId")
	project := maker.MakeProject(projectId)
	PrgDir = project.Path

	prgFormat(project.Path+"/gocreator", w)
	prgFormat(project.Path, w)

	prgBuild(project.Path, w)

}

func getProjectsHandler(w http.ResponseWriter, r *http.Request) {
	goprojects := maker.JsonProjeOku()
	json.NewEncoder(w).Encode(goprojects)
}
func getProjectHandler(w http.ResponseWriter, r *http.Request) {
	projectId := r.Header.Get("projectId")
	project := maker.GetProject(projectId)
	json.NewEncoder(w).Encode(project)

}

func saveProjectsHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var project maker.TProject
	err = json.Unmarshal(body, &project)
	if err != nil {
		panic(err)
	}

	project.Uid = uuid.New().String()

	//project.Ad= "Deneme"

	goprojects := maker.JsonProjeOku()
	goprojects = append(goprojects, project)
	maker.JsonProjeKaydet(goprojects)

	json.NewEncoder(w).Encode(goprojects)

}

func remove(s []maker.TProject, i int) []maker.TProject {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

func deleteProjectHandler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var project maker.TUid
	err = json.Unmarshal(body, &project)
	if err != nil {
		panic(err)
	}

	//project.Ad= "Deneme"

	goprojects := maker.JsonProjeOku()

	for index, element := range goprojects {
		if element.Uid == project.Uid {
			goprojects = remove(goprojects, index)
			break
		}
	}

	maker.JsonProjeKaydet(goprojects)

	json.NewEncoder(w).Encode(goprojects)

}

func getDir(w http.ResponseWriter, r *http.Request) {

	projectId := r.Header.Get("projectId")
	project := maker.GetProject(projectId)

	a, _ := NewTree(project.Path)

	json.NewEncoder(w).Encode(a.Children)

}

type TFile struct {
	Path string
}

func getFile(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var request TFile
	err = json.Unmarshal(body, &request)
	if err != nil {
		panic(err)
	}

	buf, _ := ioutil.ReadFile(request.Path)

	json.NewEncoder(w).Encode(string(buf))

}

type TFileSave struct {
	Path  string
	Value string
}

func saveFile(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var request TFileSave
	err = json.Unmarshal(body, &request)
	if err != nil {
		panic(err)
	}

	ioutil.WriteFile(request.Path, []byte(request.Value), 0644)

	prgFormat2(request.Path)

	buf, _ := ioutil.ReadFile(request.Path)
	json.NewEncoder(w).Encode(string(buf))

}

func prgFormat2(path string) {

	cmd := "go fmt " + path

	s := filepath.Dir(path)

	err, out, errout := Shellout(s, "bash", "-c", cmd)
	if err != nil {
		fmt.Print("err:")
		fmt.Println(err)
	}

	if len(out) > 0 {
		fmt.Println("out:" + out)
	}
	if len(errout) > 0 {
		fmt.Println("errout:" + errout)

	}

}
