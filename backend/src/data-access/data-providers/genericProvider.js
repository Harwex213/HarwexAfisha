const getContext = require("../sequelize");

module.exports.getById = async ({ modelName, id, transaction = null }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.findByPk(id, { transaction, raw: true });
};

module.exports.getPart = async ({ modelName, offset, where = {}, transaction = null }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.findAndCountAll({
        where,
        limit: 15,
        offset: offset * 15,
        transaction,
        raw: true,
    });
};

module.exports.create = async ({ modelName, instance, transaction = null }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return (await model.create(instance, { transaction, raw: true })).dataValues;
};

module.exports.update = async ({ modelName, instance, transaction = null }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.update(instance, {
        where: {
            id: instance.id,
        },
        transaction,
    });
};

module.exports.delete = async ({ modelName, id, transaction = null }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.destroy({
        where: {
            id: id,
        },
        transaction,
    });
};
