/*const path = require('path');

module.exports = (req, res, next) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(req.path).toLowerCase());
    const routeCheck = req.path.includes('.');

    if (!routeCheck || extname) {
        return next();
    }

    res.redirect('/');
}; */ /*Not needed, serving static files through server, remove this @patch_branch middle ware included in server big dummy mistake by me ignoring that me dough dough brain duhhooyy */