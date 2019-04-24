// Package directory_tree provides a way to generate a directory tree.
//
// Example usage:
//
//	tree, err := directory_tree.NewTree("/home/me")
//
// I did my best to keep it OS-independent but truth be told I only tested it
// on OS X and Debian Linux so YMMV. You've been warned.

package main

import (
	"os"
	"path/filepath"
	"strings"
	"time"
)

// FileInfo is a struct created from os.FileInfo interface for serialization.
type FileInfo struct {
	Name string `json:"name,omitempty"`

	Size    int64       `json:"size,omitempty"`
	Mode    os.FileMode `json:"mode,omitempty"`
	ModTime time.Time   `json:"mod_time,omitempty"`
	IsDir   bool        `json:"is_dir,omitempty"`
}

// Helper function to create a local FileInfo struct from os.FileInfo interface.
func fileInfoFromInterface(v os.FileInfo) *FileInfo {
	return &FileInfo{v.Name(), v.Size(), v.Mode(), v.ModTime(), v.IsDir()}
}

// Node represents a node in a directory tree.
type Node struct {
	Name     string    `json:"name,omitempty"`
	File     string    `json:"file,omitempty"`
	Children []*Node   `json:"children,omitempty"`
	FullPath string    `json:"path,omitempty"`
	Info     *FileInfo `json:"info,omitempty"`
	Parent   *Node     `json:"-"`
}

type Nodes map[string]*Node

/*

func (ps Nodes) Len() int {
	return len(ps)
}
func (ps Nodes) Less(i, j int) bool {
	return ps(i).Name < ps[j].Name
}
func (ps Nodes) Swap(i, j int) {
	ps[i], ps[j] = ps[j], ps[i]
}
*/

// Create directory hierarchy.
func NewTree(root string) (result *Node, err error) {
	absRoot, err := filepath.Abs(root)
	if err != nil {
		return
	}
	parents := make(Nodes)
	walkFunc := func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		ext := ""
		if fileInfoFromInterface(info).IsDir == false {
			ext = strings.Replace(filepath.Ext(path), ".", "", 1)
		}

		parents[path] = &Node{
			Name:     path,
			File:     ext,
			FullPath: path,
			Info:     fileInfoFromInterface(info),
			Children: make([]*Node, 0),
		}
		return nil
	}
	if err = filepath.Walk(absRoot, walkFunc); err != nil {

		return
	}
	for path, node := range parents {
		parentPath := filepath.Dir(path)
		parent, exists := parents[parentPath]
		if !exists { // If a parent does not exist, this is the root.
			result = node
		} else {
			node.Parent = parent
			parent.Children = append(parent.Children, node)
		}
	}

	return
}
