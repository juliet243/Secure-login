const jwt= require('jsonwebtoken');

function auth(req, res, next)
{
    const token = req.header('x-auth-token');
    
    let id;
    try
    {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        id = userId;
        return next();
    }catch (err) 
    {
       return res.sendStatus(401);
       //return res.status(401).json({ error: 'Unauthorized' });
    }

    if(id) {
        req.user = {id};
        return next();
    }

    res.sendStatus(401);
}

module.exports = auth;