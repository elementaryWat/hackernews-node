const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const {APP_SECRET,getUserById} =require('../src/utils');

async function signUp(root, args, context, info){
    //Encriptamos la contraseña
    const password= await bcrypt.hash(args.password, 10);

    //Creamos el usuario en la base de datos
    const user = await context.db.mutation.createUser({
        data:{
            ...args, password
        }
    },' { id } ');

    const token = jwt.sign({user_id:user.id},APP_SECRET);

    return {
        token,
        user
    }

}

async function login(root, args, context, info){
    //Consultamos la existencia del usuario con ese email en la db
    const user= await context.db.query.user({where:{email: args.email}},'{ id password }');

    if(!user){
        throw new Error("No existe un usuario con dicho Email");
    }

    const valid= await bcrypt.compare(args.password, user.password);
    
    if(!valid){
        return new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({user_id:user.id},APP_SECRET);

    return {
        token,
        user
    }
}

function post(root, args, context , info){
    const user_id= getUserById(context);

    return context.db.mutation.createLink({
        data:{
          description:args.description,
          url:args.url,
          postedBy:{connect:{id:user_id}}
        }
    },info)
}

module.exports={
    post,
    login,
    signUp
}