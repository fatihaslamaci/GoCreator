package main

type TProject struct {
	Uid  string
	Ad   string
	Path string
}

type TDataField struct {
	TBaseCartField
	PrimaryKey bool `json:"PrimaryKey,omitempty"`
	Size       int  `json:",omitempty,string"`
}

type TDataTable struct {
	Uid string
	TBaseCart
	Fields            []TDataField
	TabloEkOzellikler []TabloEkOzellik
}

type TabloEkOzellik struct {
	Id      int64
	SinifId int64
	Ozellik string
}

type TProxyClass struct {
	TBaseCart
	Fields []TProxyClassField
}

type TProxyClassField struct {
	TBaseCartField
}

type TEndPoint struct {
	TBaseCart
	Fields []TEndPointField
}

type TEndPointField struct {
	TBaseCartField
}

type TBaseCart struct {
	Name   string
	Fields []TBaseCartField
}

type TBaseCartField struct {
	Name      string
	FieldType string
}
