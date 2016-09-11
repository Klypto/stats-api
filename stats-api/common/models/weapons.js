module.exports = function(weapons) {
weapons.disableRemoteMethod('create', true);                // Removes (POST) /products
weapons.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
weapons.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
weapons.disableRemoteMethod("updateAll", true);               // Removes (POST) /products/update
weapons.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /products/:id
weapons.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream
};
