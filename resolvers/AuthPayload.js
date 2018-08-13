//Esta funcion es llamada para resolver la devolucion de llamadas como login o Signup

function user(root, args, context, info){
    return context.db.query.user({where:{id:root.user.id}},info);
}

module.exports= {user};