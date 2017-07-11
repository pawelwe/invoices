const Authentication = require('./controllers/authentication');
const invoices = require('./controllers/invoicesList');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {
    session: false
});
const requireSignin = passport.authenticate('local', {
    session: false
});

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({
            message: 'Secret'
        })
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.get('/invoices-list', requireAuth, invoices.invoicesList);
}