exports.authorizeRae = function authorize(req, res, next) {
    const { user } = req;

    if (user.role !== 'Rae') {
        return res.status(401).send({
            message: 'Unauthorized'
        });
    }

    next();
};