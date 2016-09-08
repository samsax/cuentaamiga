module.exports = function(Cuenta) {
	Cuenta.getCuentas = function(id1,id2, cb) {
    Cuenta.find({where:{or:[{and:[{'usuarioPago':id1}, {'usuarioDebe':id2}]},
                            {and:[{'usuarioDebe':id1}, {'usuarioPago':id2}]}]}}, function (err, instance) {
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
