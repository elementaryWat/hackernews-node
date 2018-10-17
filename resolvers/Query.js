const {APP_SECRET,getUserById} =require('../src/utils');

function feed(root,args,context,info){
    const user_id= getUserById(context);

    return context.db.query.links({},info)
}

module.exports={
    feed
}