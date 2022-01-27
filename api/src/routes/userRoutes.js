import {
    createUser,
    login,
    loginAdmin,
    loginMarket,
    listUsersLocal,
    listUsers,
    getUser,
    updateUser,
    listCustomerPayments,
    deleteUser,
    createAdmin
} from "../controllers/userController.js";

export const userRoutes = (app) => {
    app.route('/user/register')
        .post(createUser);

    app.route('/user/registerStaff')
        .post(createAdmin);

    app.route('/user/login')
        .post(login);

    app.route('/user/loginAdmin')
        .post(loginAdmin);

    app.route('/user/loginMarket')
        .post(loginMarket);

    app.route('/user/orders/:id')
        .get(listCustomerPayments)

    app.route('/user')
        .get(listUsersLocal);

    app.route('/user/list')
        .get(listUsers);

    app.route('/user/:id')
        .get(getUser);

    app.route('/user/:id')
        .put(updateUser);

    app.route('/user/:id')
        .delete(deleteUser);
}
