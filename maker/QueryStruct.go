package maker

type TQuery struct {
	Name   string
	Tables []TQueryTable
}

//type TQueryTable struct {
//	TDataCart
//}

type TQueryTable struct {
	Name   string
	Fields []TQueryField
}
type TQueryField struct {
	TBaseCartField
	Selected bool `json:",omitempty"`
}
