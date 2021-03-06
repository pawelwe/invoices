const User = require('../models/user');
var jwtDecode = require('jwt-decode');

exports.getInvoicesList = function(req, res, next) {
    const decodedToken = jwtDecode(req.header('authorization'));
    User.findOne({ _id: decodedToken.sub }, function(err, existingUser) {
        if(err) { return next(err); }
        if(existingUser) {
            res.send({
                    invoicesList: existingUser.invoicesList
                })
        } else {
            res.status(404);
        }
    })
}

exports.updateInvoicesList = function(req, res, next) {
    const decodedToken = jwtDecode(req.header('authorization'));
    User.findOne({ _id: decodedToken.sub }, function(err, existingUser) {
        if(existingUser) {
            existingUser.invoicesList = req.body;
            existingUser.save(function(err) {
                if (err) {
                    return next(err);
                }
            })
            res.send({
                invoicesList: existingUser.invoicesList
            })
        } else {
            res.status(404)
        }
    })
}