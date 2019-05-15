// Copyright 2019 The GoCreator Authors. All rights reserved.
// Code Generator tarafından bir defaya mahsus oluşturulmuştur
// Taslakdır, Map işlemini manuel yapmalısınız
package gocreator

import (
	"gocreator/maker"
)

func SaveQueryBuilderHandlerMap(v SaveQueryBuilderRequest) SaveQueryBuilderResponse {
	var r SaveQueryBuilderResponse
	// TODO(Map) Implament
	maker.JsonQueryKaydet(v.Query, maker.GetProject(v.ProjectId).Path)

	r.Query = v.Query

	return r
}
