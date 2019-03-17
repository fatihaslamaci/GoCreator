Vue.component('SamplePage', {
    data: function () {
        return {
            count: 0,
            info:[]
        }
    },
    mounted () {
        axios
          .get('/api/getProject')
          .then(response => (
              this.info = response.data
            )
        )
    },

    template: `<div> <button v-on:click="count++">You clicked me times. {{count}} fatih3
    </button>
    <sample-comp></sample-comp>
    
    
    {{info}}

    
    </div>
    `,
    
});

