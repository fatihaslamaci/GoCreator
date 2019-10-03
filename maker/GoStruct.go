package maker

type TUid struct {
	Uid string
}

type TProject struct {
	Uid  string
	Ad   string
	Path string
}

type TPackets struct {
	PacketNames []string `json:",omitempty"`
}

type TBaseCart struct {
	Name   string
	Fields []TBaseCartField
}

type TBaseCartField struct {
	Name      string
	FieldType string
	IsArray   bool `json:",omitempty"`
}

type TDataCart struct {
	Name   string
	Fields []TDataField
}

type TDataField struct {
	TBaseCartField
	Dflt_value   string `json:",omitempty"`
	PrimaryKey   bool   `json:",omitempty"`
	Nullable     bool   `json:",omitempty"`
	Size         int    `json:",omitempty,string"`
	ForeignKey   bool   `json:",omitempty"`
	ForeignTable string `json:",omitempty"`
	ForeignField string `json:",omitempty"`
}

type TDataTable struct {
	Uid string
	TDataCart
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

type TEndPointList struct {
	TPackets
	EndPoints []TEndPoint
}

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
	Body_Header int  //0 :Body Read, 1 :Header Read
	IsRequired  bool `json:",omitempty"`
}
