
module.exports = function(Usuario) {
  var gcm = require('node-gcm')
  , _ = require('underscore')
  , registrationIds = []
  , sender = new gcm.Sender('YOUR-API-KEY');

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

  Usuario.getWithNickname = function(nickname, cb) {
    Usuario.find({"include":["ultimogrupo"],"where":{"nickname":nickname}}, function (err, instance) {
       cb(null, instance);
    });
  },

  Usuario.registrarGCM = function(id, cb) {
    registrationIds.push(id);
    cb(null, 200);
    };

  Usuario.desregistrarGCM = function(id, cb) {
    registrationIds = _.without(registrationIds, id);
    cb(null, 200);
    };

  Usuario.mensajeGCM = function(mensaje,id, cb) {
    var message;
    message = new gcm.Message;
    message.addData('message', req.body.message);
    //_.intersection(registrationIds, req.body.receptors.split(','));
    sender.send(message, id, 4, function(result) {
    console.log(result);
    cb(null, 200);
  });
  };
  
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
  Usuario.remoteMethod (
    'getWithNickname',
        {
          http: {path: '/getWithNickname', verb: 'get'},
          accepts: {arg: 'nickname', type: 'string'},
          returns: {arg: 'id', type: 'string'}
        }
        )
Usuario.remoteMethod (
    'registrarGCM',
        {
          http: {path: '/registrarGCM', verb: 'get'},
          accepts: {arg: 'id', type: 'string'},
          returns: {arg: 'id', type: 'string'}
        }
        )
Usuario.remoteMethod (
    'desregistrarGCM',
        {
          http: {path: '/desregistrarGCM', verb: 'get'},
          accepts: {arg: 'id', type: 'string'},
          returns: {arg: 'id', type: 'string'}
        }
        )
Usuario.remoteMethod (
    'mensajeGCM',
        {
          http: {path: '/mensajeGCM', verb: 'get'},
          accepts: [{arg: 'mensaje', type: 'string'},
          {arg: 'id', type: 'string'}],
          returns: {arg: 'id', type: 'string'}
        }
        )

};
