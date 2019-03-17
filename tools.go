package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"sync"
)

func Copy(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	if err != nil {
		return err
	}
	return out.Close()
}

func Shellout(path string, name string, arg ...string) (error, string, string) {
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd := exec.Command(name, arg...)
	cmd.Dir = path
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	return err, stdout.String(), stderr.String()
}

func prgRun() {
	c := exec.Command("/home/fatih/go/src/goprj/main")
	c.Dir = "/home/fatih/go/src/goprj"

	//w, _ := c.StdinPipe()
	r, _ := c.StdoutPipe()
	if err := c.Start(); err != nil {
		log.Fatal(err)
	}

	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		s := bufio.NewScanner(r)
		for s.Scan() {
			fmt.Println(s.Text())
		}
		wg.Done()
	}()

	wg.Wait()
}
