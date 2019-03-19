const SamplePage = {
    template: '<sample-page></sample-page>'
};
const TablesPage = {
    template: '<tables-page></tables-page>'
};
const ProxyClassPage = {
    template: '<proxy-class-page></proxy-class-page>'
};


const About = {
    template: '<div>About</div>'
};

const BuildPage = {
    template: '<build-page></build-page>'
};

const router = new VueRouter({
    routes: [
        {
            path: '/SamplePage',
            component: SamplePage,
            name: 'SamplePage'
        },
        {
            path: '/about',
            component: About,
            name: 'about'
        },
        {
            path: '/TablesPage',
            component: TablesPage,
            name: 'TablesPage'
        },
        {
            path: '/ProxyClassPage',
            component: ProxyClassPage,
            name: 'ProxyClassPage'
        },
        {
            path: '/BuildPage',
            component: BuildPage,
            name: 'BuildPage'
        },
    ]
});