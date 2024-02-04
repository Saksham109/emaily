//check which keys to use , either dev or prod

if(process.env.NODE_ENV ==='production')
{

    //we are in production currently

    module.exports=require('./prod');

}
else
{

    //we are in development currently

    module.exports=require('./dev');

}

