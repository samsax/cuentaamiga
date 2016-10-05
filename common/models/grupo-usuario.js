'use strict';

module.exports = function(Grupousuario) {
	Grupousuario.getUsuarios = function(id1,cb){
		Grupousuario.find({"include":["usuarios"],"where":{"grupoId":id1}},
                     function (err, instance) {
       cb(null, instance);
        });
	}

	Grupousuario.remoteMethod (
        'getUsuarios',
        {
          http: {path: '/getusuarios', verb: 'get'},
          accepts:{arg: 'id1', type: 'string'},
          returns: {arg: 'id', type: 'string'}
        }
    );
};
