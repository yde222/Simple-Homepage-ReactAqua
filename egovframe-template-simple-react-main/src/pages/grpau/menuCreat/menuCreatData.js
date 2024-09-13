const fileSystem = [
    {
        value: '/app',
        label: 'app',
        children: [
            {
                value: '/app/Http',
                label: 'Http',
                children: [
                    {
                        value: '/app/Http/Controllers',
                        label: 'Controllers',
                        children: [{
                            value: '/app/Http/Controllers/WelcomeController.js',
                            label: 'WelcomeController.js',
                        }],
                    },
                    {
                        value: '/app/Http/routes.js',
                        label: 'routes.js',
                    },
                ],
            },
            {
                value: '/app/Providers',
                label: 'Providers',
                children: [{
                    value: '/app/Providers/EventServiceProvider.js',
                    label: 'EventServiceProvider.js',
                }],
            },
        ],
    },
    {
        value: '/config',
        label: 'config',
        children: [
            {
                value: '/config/app.js',
                label: 'app.js',
            },
            {
                value: '/config/database.js',
                label: 'database.js',
            },
        ],
    },
    {
        value: '/public',
        label: 'public',
        children: [
            {
                value: '/public/assets/',
                label: 'assets',
                children: [{
                    value: '/public/assets/style.css',
                    label: 'style.css',
                }],
            },
            {
                value: '/public/index.html',
                label: 'index.html',
            },
        ],
    },
    {
        value: '/.env',
        label: '.env',
    },
    {
        value: '/.gitignore',
        label: '.gitignore',
    },
    {
        value: '/README.md',
        label: 'README.md',
    },
];

// const empires = [
//     {
//         value: 'grapu',
//         label: '그룹및권한관리',
//         children: [
//             {
//                 value: 'user',
//                 label: '사용자관리',
//                 children: [
//                     {
//                         value: 'userInsert',
//                         label: '사용자등록관리',
//                     },
//                     {
//                         value: 'userDelete',
//                         label: '사용자부재관리',
//                     },
//                 ],
//             },
//             {
//                 value: 'userAuthor',
//                 label: '사용자권한관리',
//                 children: [
//                     {
//                         value: 'authorityMan',
//                         label: '권한관리',
//                     },
//                     {
//                         value: 'userGroup',
//                         label: '사용자그룹관리',
//                     },
//                     {
//                         value: 'userAuthority',
//                         label: '사용자별권한관리',
//                     },
//                     {
//                         value: 'roleMan',
//                         label: '롤관리',
//                     },
//                 ],
//             },
//             {
//                 value: 'menu',
//                 label: '메뉴관리',
//                 children: [
//                     {
//                         value: 'prgMan',
//                         label: '프로그램목록관리',
//                     },
//                     {
//                         value: 'menuCreat',
//                         label: '메뉴생성관리',
//                     },
//                     {
//                         value: 'menuMan',
//                         label: '메뉴목록관리',
//                     },
//                 ],
//             },
//         ],
//     },
// ];

//메뉴생성 insert
//select * from LETTNMENUCREATDTLS
///sym/mnu/mcm/EgovMenuCreatSelect.do
//selectMenuCreatList_D
//select * from LETTNMENUINFO
//menuNo로 value변경

const empires = [
    {
        value: '6000000',
        label: '그룹및권한관리',
        children: [
            {
                value: '6010000',
                label: '사용자관리',
                children: [
                    {
                        value: '6010100',
                        label: '사용자등록관리',
                    },
                    {
                        value: '6010200',
                        label: '사용자부재관리',
                    },
                ],
            },
            {
                value: '6020000',
                label: '사용자권한관리',
                children: [
                    {
                        value: '6020100',
                        label: '권한관리',
                    },
                    {
                        value: '6020200',
                        label: '사용자그룹관리',
                    },
                    {
                        value: '6020300',
                        label: '사용자별권한관리',
                    },
                    {
                        value: '6020400',
                        label: '롤관리',
                    },
                ],
            },
            {
                value: '6030000',
                label: '메뉴관리',
                children: [
                    {
                        value: '6030100',
                        label: '프로그램목록관리',
                    },
                    {
                        value: '6030200',
                        label: '메뉴생성관리',
                    },
                    {
                        value: '6030300',
                        label: '메뉴목록관리',
                    },
                ],
            },
        ],
    },
];

export {
    fileSystem,
    empires,
};
