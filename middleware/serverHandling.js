const path = require('path');

module.exports = (req, res, next) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(req.path).toLowerCase());
    const routeCheck = req.path.includes('.');

    if (!routeCheck || extname) {
        return next();
    }

    res.redirect('/');
};