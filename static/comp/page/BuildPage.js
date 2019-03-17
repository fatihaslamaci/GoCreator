Vue.component('BuildPage', {
    data: function () {
        return {
            count: 0,
            info:[],
        }
    },
    mounted () {
        connect();
        axios
            .get('/api/getProject')
            .then(response => (
                    this.info = response.data
                )
            )
    },
    methods: {
        build() {
            var output = document.getElementById("output");
            output.innerHTML="";
            this.loading = true;
            axios
                .post('/api/build', {}, {headers: {projectId: sessionStorage.projectId}})
                .then(response => {
                    output.innerHTML += response.data + "\n";
                    send('build');
                })
                .catch((error) => {
                    output.innerHTML += "Response Error : "+ error + "\n";

                })
                .finally(() => {
                    this.loading = false;
                })


        },


    },

    template: `<div> 

<v-btn color="green darken-1"  @click="build()">Build</v-btn>
   

<pre id="output"></pre>
</div>
  
    
    
    
    `,

});





let socket = null;


function connect() {
    socket = new WebSocket("ws://localhost:8080/echo");
    let output = undefined;

    socket.onopen = function () {

        if (output== undefined) {
            output = document.getElementById("output");
        }
        output.innerHTML += "Status: Connected\n";
    };

    socket.onmessage = function (e) {
        //var output = document.getElementById("output");
        output.innerHTML +=  e.data + "\n";
    };

    socket.onclose = function (e) {
        //var output = document.getElementById("output");
        output.innerHTML +=  'Socket is closed. Reconnect will be attempted in 10 second.' + "\n";
        setTimeout(function () {
            connect();
        }, 10000);
    };

}

function send(val) {
    socket.send(val);
};


