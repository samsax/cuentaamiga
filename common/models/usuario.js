module.exports = function(Usuario) {
	Usuario.getLogin = function(nickname,password, cb) {
    Usuario.findOne({where:{and:[{'nickname':nickname}, {'password':password}]}}, function (err, instance) {
       cb(null, instance);
    });
  }
  
  Usuario.remoteMethod (
        'getLogin',
        {
          http: {path: '/getlogin', verb: 'get'},
          accepts:[{arg: 'nickname', type: 'string'},
          			 {arg: 'password', type: 'string'} 
          			 		],
          returns: {arg: 'id', type: 'string'}
        }
    );
};
