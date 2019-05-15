// Copyright 2019 The GoCreator Authors. All rights reserved.
// Code Generator tarafından oluşturulmuştur
// Lütfen Değişiklik yapmayınız
package gocreator

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

func HandleFuncAdd() {
	http.HandleFunc("/api/GetQueryBuilder", GetQueryBuilderHandler)
	http.HandleFunc("/api/SaveQueryBuilder", SaveQueryBuilderHandler)
}
func GetQueryBuilderHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var inputClass GetQueryBuilderRequest
	err = json.Unmarshal(body, &inputClass)
	if err != nil {
		panic(err)
	}
	outputClass := GetQueryBuilderHandlerMap(inputClass)
	json.NewEncoder(w).Encode(outputClass)
}

/*
   JavaScript Call Sample
   GetQueryBuilderHandler() {
   var prm = {
     ProjectId  : null,
   };
   var r = {
     Query  : null,
   };
   this.loading = true;
   axios
   .post('/api/GetQueryBuilder', prm, {})
   .then(response => {
   r = response.data;
   })
   .catch((error) => {
   console.log(error)
   })
   .finally(() => {
   this.loading = false;
   })
   },
*/
func SaveQueryBuilderHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var inputClass SaveQueryBuilderRequest
	err = json.Unmarshal(body, &inputClass)
	if err != nil {
		panic(err)
	}
	outputClass := SaveQueryBuilderHandlerMap(inputClass)
	json.NewEncoder(w).Encode(outputClass)
}

/*
   JavaScript Call Sample
   SaveQueryBuilderHandler() {
   var prm = {
     ProjectId  : null,
     Query  : null,
   };
   var r = {
     Query  : null,
   };
   this.loading = true;
   axios
   .post('/api/SaveQueryBuilder', prm, {})
   .then(response => {
   r = response.data;
   })
   .catch((error) => {
   console.log(error)
   })
   .finally(() => {
   this.loading = false;
   })
   },
*/
