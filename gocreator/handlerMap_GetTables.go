// Copyright 2019 The GoCreator Authors. All rights reserved.
// Code Generator tarafından bir defaya mahsus oluşturulmuştur
// Taslakdır, Map işlemini manuel yapmalısınız
package gocreator

import (
	"gocreator/maker"
)

func GetTablesHandlerMap(v GetTablesRequest) []maker.TDataTable {
	return maker.JsonTableOku(maker.GetProject(v.ProjectId).Path)
}
