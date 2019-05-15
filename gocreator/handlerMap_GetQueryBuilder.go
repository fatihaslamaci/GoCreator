// Copyright 2019 The GoCreator Authors. All rights reserved.
// Code Generator tarafından bir defaya mahsus oluşturulmuştur
// Taslakdır, Map işlemini manuel yapmalısınız
package gocreator

import (
	"gocreator/maker"
)

func GetQueryBuilderHandlerMap(v GetQueryBuilderRequest) GetQueryBuilderResponse {
	var r GetQueryBuilderResponse
	r.Query = maker.JsonQueryOku(maker.GetProject(v.ProjectId).Path)
	return r
}
