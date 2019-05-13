const SamplePage = {
    template: '<sample-page></sample-page>'
};
const TablesPage = {
    template: '<tables-page></tables-page>'
};
const ProxyClassPage = {
    template: '<proxy-class-page></proxy-class-page>'
};
const EndPointPage = {
    template: '<end-point-page></end-point-page>'
};

const QueryBuilderPage = {
    template: '<query-builder-page></query-builder-page>'
};


const ExplorerPage = {
    template: '<explorer-page></explorer-page>'
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
            path: '/EndPointPage',
            component: EndPointPage,
            name: 'EndPointPage'
        },
        {
            path: '/QueryBuilderPage',
            component: QueryBuilderPage,
            name: 'QueryBuilderPage'
        },
        {
            path: '/ExplorerPage',
            component: ExplorerPage,
            name: 'ExplorerPage'
        },
        {
            path: '/BuildPage',
            component: BuildPage,
            name: 'BuildPage'
        }

    ]
});
