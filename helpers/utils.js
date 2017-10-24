const jsend = {
    success(data) {
        return (Object.assign({}, {status: "success", data}));
    },
    fail(data) {
        return (Object.assign({}, {status: "fail", data}));
    },
    error(err) {
        return (Object.assign({}, {status: "error", message: err.message}));
    }
};

module.exports = {
    jsend
};