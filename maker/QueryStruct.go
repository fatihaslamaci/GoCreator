package maker

type TQuery struct {
	Tables []TQueryTable
}

type TQueryTable struct {
	TDataCart
}

type TQueryCart struct {
	Name   string
	Fields []TDataField
}
type TQueryField struct {
	TBaseCartField
	Selected bool `json:",omitempty"`
}
