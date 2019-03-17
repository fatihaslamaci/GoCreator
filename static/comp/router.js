const SamplePage = {
    template: '<sample-page></sample-page>'
};
const TablesPage = {
    template: '<tables-page></tables-page>'
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
            path: '/BuildPage',
            component: BuildPage,
            name: 'BuildPage'
        },
    ]
});