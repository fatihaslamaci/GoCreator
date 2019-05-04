package maker

type TProject struct {
	Uid  string
	Ad   string
	Path string
}

type TBaseCart struct {
	Name   string
	Fields []TBaseCartField
}

type TBaseCartField struct {
	Name      string
	FieldType string
}

type TDataField struct {
	TBaseCartField
	Dflt_value string `json:",omitempty"`
	PrimaryKey bool   `json:",omitempty"`
	Nullable   bool   `json:",omitempty"`
	Size       int    `json:",omitempty,string"`
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
	//Fields []TProxyClassField
}

//type TProxyClassField struct {
//	TBaseCartField
//}

type TEndPoint struct {
	Name     string
	Request  TEndPointCart
	Response TEndPointCart
}

type TEndPointCart struct {
	Name   string
	Fields []TEndPointField
}

type TEndPointField struct {
	TBaseCartField
	Body_Header int //0 :Body Read, 1 :Header Read
}
