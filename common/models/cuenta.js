module.exports = function(Cuenta) {
	Cuenta.getCuentas = function(id1,id2, cb) {
    Cuenta.find({where:{or:[{'usuarioPago':id1}, {'usuarioDebe':id2},{'usuarioPago':id2}, {'usuarioDebe':id1}]}}, function (err, instance) {
       cb(null, instance);
    });
  }

  Cuenta.remoteMethod (
        'getCuentas',
        {
          http: {path: '/getcuentas', verb: 'get'},
          accepts:[{arg: 'id1', type: 'string'},
          			{arg: 'id2', type: 'string'} 
          			 		],
          returns: {arg: 'id', type: 'string'}
        }
    );
};
