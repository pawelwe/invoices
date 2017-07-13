const Authentication = require('./controllers/authentication');
const InvoicesList = require('./controllers/invoicesList');
const InvoiceTemplate = require('./controllers/invoiceTemplate');
const passportService = require('./services/passport');
const passport = require('passport');

// Passport config
const requireAuth = passport.authenticate('jwt', {
    session: false
});

const requireSignin = passport.authenticate('local', {
    session: false
});

module.exports = function(app) {
    // Authentication
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

    // Invoice template
    app.get('/invoice-template', requireAuth, InvoiceTemplate.getInvoiceTemplate);
    app.put('/invoice-template', requireAuth, InvoiceTemplate.updateInvoiceTemplate);

    // Invoices list
    app.get('/invoices-list', requireAuth, InvoicesList.getInvoicesList);
    app.put('/invoices-list', requireAuth, InvoicesList.updateInvoicesList);
}