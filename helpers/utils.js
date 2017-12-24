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

const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    }
}

module.exports = {
    jsend,
    debounce
};