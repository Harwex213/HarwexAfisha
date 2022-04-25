const getContext = require("../sequelize");

module.exports.getById = async ({ modelName, id }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.findByPk(id);
};

module.exports.create = async ({ modelName, instance }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.create(instance);
};

module.exports.update = async ({ modelName, instance }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.update(instance, {
        where: {
            id: instance.id,
        },
    });
};

module.exports.delete = async ({ modelName, id }) => {
    const { models } = await getContext();
    const model = models[modelName];
    if (!model) {
        throw new Error("Undefined model");
    }

    return model.destroy({
        where: {
            id: id,
        },
    });
};
