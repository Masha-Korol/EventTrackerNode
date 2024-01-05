const userModel = require('./../users/user-model');

const adminOnlyUrls = [
    '/api/artists/', // POST/GET
    '/api/cities/', // POST/GET
    '/api/events/', // POST
    '/api/events/posters', // POST
    '/api/events/:id', // PATCH/DELETE
    '/api/users/', // POST
];

const roleValidator = (requiredRoles) => {
    return (req, res, next) => {
        console.log(`req = ${req}`);

        const currUserRoles = [req.isAdmin ? 'admin' : 'user'];
        if (isUserRoleInRequiredRoles(requiredRoles, currUserRoles)) {
            console.log(`User ${req.currentUserName} is authorized with roles ${currUserRoles}`)
            next();
        } else {
            console.log(`User ${req.currentUserName} is NOT authorized with roles ${currUserRoles}`)
            res.status(403).json({message: 'Forbidden'});
        }
    };
};

function isUserRoleInRequiredRoles(requiredRoles, userRoles) {
    return requiredRoles.some(function(value) {
        return userRoles.includes(value);
    });
}

module.exports = {roleValidator};
