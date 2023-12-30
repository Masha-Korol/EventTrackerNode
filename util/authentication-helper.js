const userModel = require('./../users/user-model');

async function basicAuth(req, res, next) {
    // make authenticate path public
    if (req.path === '/api/users/login') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({message: 'Missing Authorization Header'});
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userName, password] = credentials.split(':');
    const currentUser = await authenticate(userName, password);
    if (!currentUser) {
        return res.status(403).json({});
    }

    // attach user to request object
    req.currentUserId = currentUser.id;
    req.currentUserName = currentUser.userName;

    next();
}

async function authenticate(userName, password) {
    const user = await userModel.findOne({userName});
    if (!user || user.password !== password) {
        return user;
    }

    return user;
}

module.exports = {basicAuth, authenticate};
