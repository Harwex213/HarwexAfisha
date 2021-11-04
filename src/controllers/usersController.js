const router = require("express").Router();
const userService = require("../services/userService");
const { responseOk } = require("./helper/response");
const validateModel = require("./helper/requestBodyValidator");

const schemasOfRequired = {
    postUser: ["username", "password", "firstName", "lastName", "patronymic", "role"],
    putUser: ["id", "username", "password", "firstName", "lastName", "patronymic", "role"],
    deleteUser: ["id"],
};

const schemas = {
    postUser: {
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        patronymic: null,
        role: null,
    },
    putUser: {
        id: null,
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        patronymic: null,
        role: null,
    },
    deleteUser: {
        id: null,
    },
};

const getUsers = async (request, response, next) => {
    try {
        const result = await userService.getUsers();

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const postUser = async (request, response, next) => {
    try {
        const model = {
            ...schemas.postUser,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.postUser);

        const result = await userService.insertUser(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const putUser = async (request, response, next) => {
    try {
        const model = {
            ...schemas.putUser,
            ...request.body,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.putUser);

        const result = await userService.updateUser(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

const deleteUser = async (request, response, next) => {
    try {
        const model = {
            ...schemas.deleteUser,
            id: request.params.userId,
        };
        console.log("Received model", model);
        validateModel(model, schemasOfRequired.deleteUser);

        const result = await userService.deleteUser(model);

        responseOk(result, response);
    } catch (e) {
        next(e);
    }
};

router.get("/", getUsers);
router.post("/", postUser);
router.put("/", putUser);
router.delete("/:userId", deleteUser);

module.exports = router;
