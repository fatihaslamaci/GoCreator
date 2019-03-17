package main

type TProject struct {
	Uid  string
	Ad   string
	Path string
}

type TDataField struct {
	Name       string //TabloAdi
	PrimaryKey bool   `json:"PrimaryKey,omitempty"`
	DataType   string
	Size       int `json:",omitempty,string"`
}

type TDataTable struct {
	Uid               string
	Ad                string
	Fields            []TDataField
	TabloEkOzellikler []TabloEkOzellik
}

type TabloEkOzellik struct {
	Id      int64
	SinifId int64
	Ozellik string
}
