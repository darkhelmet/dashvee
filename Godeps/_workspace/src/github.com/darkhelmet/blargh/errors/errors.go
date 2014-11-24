package errors

type NotFound string

func (nf NotFound) Error() string {
	return string(nf)
}
