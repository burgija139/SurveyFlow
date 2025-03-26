
const passport = require('passport');

module.exports = app =>{
    app.get('/auth/google',passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',passport.authenticate('google'),(req, res) => {
        res.redirect('/surveys');   
        }
    );

 
    app.get('/api/logout', (req, res, next) => {
        req.session.destroy((err) => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
    
    app.get('/api/test', (req, res) => {
        res.send({ message: 'Test route is working!' });
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    
   
};
