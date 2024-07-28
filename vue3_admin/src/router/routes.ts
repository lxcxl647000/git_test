// 配置常量路由//
export const constantRoute = [
    {
        // 登录//
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        name: 'login',
        meta: {
            title: '登录',
            show: false,
            icon: 'House'
        }
    },
    {
        // 登录成功后的数据展示//
        path: '/',
        component: () => import('@/layout/Layout.vue'),
        name: 'layout',
        redirect: '/home',
        meta: {
            title: 'layout',
            show: true,
            icon: 'House'
        },
        children: [
            {
                // 首页//
                path: '/home',
                component: () => import('@/views/home/Home.vue'),
                name: 'home',
                meta: {
                    title: '首页',
                    show: true,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        // 数据大屏//
        path: '/screen',
        component: () => import('@/views/screen/Screen.vue'),
        name: 'login',
        meta: {
            title: '数据大屏',
            show: true,
            icon: 'DataBoard'
        }
    },
    {
        // 权限管理//
        path: '/acl',
        component: () => import('@/layout/Layout.vue'),
        name: 'Acl',
        redirect: '/acl/user',
        meta: {
            title: '权限管理',
            show: true,
            icon: 'Lock'
        },
        children: [
            {
                // 用户管理//
                path: '/acl/user',
                component: () => import('@/views/acl/user/User.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    show: true,
                    icon: 'User'
                }
            },
            {
                // 角色管理//
                path: '/acl/role',
                component: () => import('@/views/acl/role/Role.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    show: true,
                    icon: 'UserFilled'
                }
            },
            {
                // 菜单管理//
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/Permission.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    show: true,
                    icon: 'Menu'
                }
            }
        ]
    },
    {
        // 商品管理//
        path: '/product',
        component: () => import('@/layout/Layout.vue'),
        name: 'Product',
        redirect: '/product/trademark',
        meta: {
            title: '商品管理',
            show: true,
            icon: 'Goods'
        },
        children: [
            {
                // 品牌管理//
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/Trademark.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    show: true,
                    icon: 'GoodsFilled'
                }
            },
            {
                // 属性管理//
                path: '/product/attr',
                component: () => import('@/views/product/attr/Attr.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    show: true,
                    icon: 'DataAnalysis'
                }
            },
            {
                // SPU管理//
                path: '/product/spu',
                component: () => import('@/views/product/spu/Spu.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    show: true,
                    icon: 'Menu'
                }
            },
            {
                // SKU管理//
                path: '/product/sku',
                component: () => import('@/views/product/sku/Sku.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    show: true,
                    icon: 'Menu'
                }
            }
        ]
    },
    {
        // 404//
        path: '/404',
        component: () => import('@/views/page_404/Page_404.vue'),
        name: '404',
        meta: {
            title: '404',
            show: false,
            icon: 'House'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            show: false,
            icon: 'House'
        }
    },
]