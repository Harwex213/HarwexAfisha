export const extractFileExt = (filePath) => {
    const split = filePath.split(".");
    return split[split.length - 1];
};
