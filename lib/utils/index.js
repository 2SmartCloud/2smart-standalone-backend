function cloneDeep(data) {
    return JSON.parse(JSON.stringify(data));
}

module.exports = {
    cloneDeep
};