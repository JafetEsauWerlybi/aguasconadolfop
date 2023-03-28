const routes = {
    home : '/',
    login : '/login',
    nosotros : '/nosotros',
    register: '/register',
    account : '/account',
    products: '/products',
    product:(productId) => (productId? `/products/:${productId}` : '/products/:productId'),
    admin:{
        users:'/admin/user',
        products:'/admin/productsAdmin',
        compras:'/admin/compras',
        registros:'/admin/registros'
    }
}
export default routes;