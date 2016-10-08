module.exports = function(Usuario) {
	Usuario.getLogin = function(nickname,password, cb) {
    Usuario.findOne({where:{and:[{'nickname':nickname}, {'password':password}]}}, function (err, instance) {
       cb(null, instance);
    })},

  Usuario.updateGrupo = function(id,grupoid, cb) {
    Usuario.findById(id, function (err, instance) {
       instance.updateAttributes({"grupoid":grupoid})
       cb(null, instance);
    });
  },
  Usuario.getWithCorreo = function(correo, cb) {
    Usuario.find({"where":{"correo":correo}}, function (err, instance) {
       cb(null, instance);
    });
  },
  
  Usuario.remoteMethod (
        'getLogin',
        {
          http: {path: '/getlogin', verb: 'get'},
          accepts:[{arg: 'nickname', type: 'string'},
          			 {arg: 'password', type: 'string'} 
          			 		],
          returns: {arg: 'id', type: 'string'}
        }
      
        )
 Usuario.remoteMethod (
    'updateGrupo',
        {
          http: {path: '/updateGrupo', verb: 'get'},
          accepts:[{arg: 'id', type: 'string'},
                 {arg: 'grupoid', type: 'string'}],
          returns: {arg: 'id', type: 'string'}
        }
        )
  Usuario.remoteMethod (
    'getWithCorreo',
        {
          http: {path: '/getWithCorreo', verb: 'get'},
          accepts: {arg: 'correo', type: 'string'},
          returns: {arg: 'id', type: 'string'}
        }
        )
};
