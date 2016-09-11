module.exports = function(Characters) {
	Characters.disableRemoteMethod('create', true);                // Removes (POST) /products
	Characters.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
	Characters.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
	Characters.disableRemoteMethod("updateAll", true);               // Removes (POST) /products/update
	Characters.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /products/:id
	Characters.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream
	
	Characters.findByIdCustom = function(id, filter, cb) {
		Characters.findById(id, filter, cb);
	}
	
	//Define remote method
	Characters.remoteMethod(
	  'findByIdCustom',
	  {
		description: 'Find a model instance by id from the data source.',
		accessType: 'READ',
		accepts: [
			{ 
				arg: 'id', 
				type: 'string', 
				description: 'Model id', 
				required: true,
				http: {
					source: 'path'
				}
			},
			{ 	
				arg: 'filter', 
				type: 'object',
				description: 'Filter defining fields and include'
			}
		],
		returns: {arg: 'data', type: 'user', root: true},
		http: {verb: 'get', path: '/:id'},
		rest: {after: Characters.convertNullToNotFoundError},
		isStatic: true
	  }
	);

	//disable built-in remote method
	Characters.disableRemoteMethod('findById', true);
	
	Characters.existsCustom = function(id, filter, cb) {
		Characters.exists(id, filter, cb);
	}
	
	Characters.remoteMethod(
	  'existsCustom',
	  {
		description: 'Check whether a model instance exists in the data source.',
		accessType: 'READ',
		accepts: [
			{ 
				arg: 'id', 
				type: 'string', 
				description: 'Model id', 
				required: true,
				http: {
					source: 'path'
				}
			},
			{ 	
				arg: 'filter', 
				type: 'object',
				description: 'Filter defining fields and include'
			}
		],
		returns: {arg: 'data', type: 'user', root: true},
		http: {verb: 'get', path: '/:id/exists'},
		rest: {after: Characters.convertNullToNotFoundError},
		isStatic: true
	  }
	);
	
	//disable built-in remote method
	Characters.disableRemoteMethod('exists', true);
	
	
};
