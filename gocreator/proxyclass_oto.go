// Copyright 2019 The GoCreator Authors. All rights reserved.
// Code Generator tarafından oluşturulmuştur
// Lütfen Değişiklik yapmayınız
package gocreator

import (
	"gocreator/maker"
)

type GetQueryBuilderRequest struct {
	ProjectId string
}
type GetQueryBuilderResponse struct {
	Query []maker.TQuery
}
type SaveQueryBuilderRequest struct {
	ProjectId string
	Query     []maker.TQuery
}
type SaveQueryBuilderResponse struct {
	Query []maker.TQuery
}
type GetTablesRequest struct {
	ProjectId string
}
type GetTablesResponse struct {
	Tables []maker.TDataTable
}
