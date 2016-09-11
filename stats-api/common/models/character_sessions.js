module.exports = function(character_sessions) {
	character_sessions.disableRemoteMethod('create', true);                // Removes (POST) /products
	character_sessions.disableRemoteMethod('upsert', true);                // Removes (PUT) /products
	character_sessions.disableRemoteMethod('deleteById', true);            // Removes (DELETE) /products/:id
	character_sessions.disableRemoteMethod("updateAll", true);               // Removes (POST) /products/update
	character_sessions.disableRemoteMethod("updateAttributes", false);       // Removes (PUT) /products/:id
	character_sessions.disableRemoteMethod('createChangeStream', true);    // removes (GET|POST) /products/change-stream
	
	character_sessions.findByIdBig = function(id, filter, cb) {
		character_sessions.findById(id, filter, cb);
	}
	
	//Define remote method
	character_sessions.remoteMethod(
	  'findByIdBig',
	  {
		description: 'Find a model instance by id from the data source.',
		accessType: 'READ',
		accepts: [
			{ arg: 'id', type: 'string', description: 'Model id', required: true,
			  http: {source: 'path'}},
			{ arg: 'filter', type: 'object',
			  description: 'Filter defining fields and include'}
		],
		returns: {arg: 'data', type: 'user', root: true},
		http: {verb: 'get', path: '/:id'},
		rest: {after: character_sessions.convertNullToNotFoundError},
		isStatic: true
	  }
	);

	//disable built-in remote method
	character_sessions.disableRemoteMethod('findById', true);
	

};
