package maker

type TQuery struct {
	Name       string
	QueryEnd   string `json:",omitempty"`
	Tables     []TQueryTable
	Parameters []TBaseCartField
}

//type TQueryTable struct {
//	TDataCart
//}

type TQueryTable struct {
	Name   string
	Join   string `json:",omitempty"`
	JoinOn string `json:",omitempty"`
	Fields []TQueryField
}
type TQueryField struct {
	TBaseCartField
	Selected bool `json:",omitempty"`
}
