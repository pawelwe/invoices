const User = require('../models/user');
var jwtDecode = require('jwt-decode');

exports.getInvoiceTemplate = function(req, res, next) {
    const decodedToken = jwtDecode(req.header('authorization'));
    User.findOne({ _id: decodedToken.sub }, function(err, existingUser) {
        if(err) { return next(err); }
        if(existingUser) {
            res.send({
                    invoiceTemplate: existingUser.invoiceTemplate
                })
        } else {
            res.status(404);
        }
    })
}

exports.updateInvoiceTemplate = function(req, res, next) {
    const decodedToken = jwtDecode(req.header('authorization'));
    User.findOne({ _id: decodedToken.sub }, function(err, existingUser) {
        if(existingUser) {
            existingUser.invoiceTemplate = req.body;
            existingUser.save(function(err) {
                if (err) {
                    return next(err);
                }
            })
            res.send({
                invoiceTemplate: existingUser.invoiceTemplate
            })
        } else {
            res.status(404)
        }
    })
}