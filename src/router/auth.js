module.exports={
    globalNav : function(to,from,next){
        if(localStorage.getItem('token')){
            next({
                name : 'HomeRoute'
            })
        } else{
            next()
        }
    },
    authNav : function(to,form,next){
        if(!localStorage.getItem('token')){
            next({
                name : 'Login'
            })
        } else {
            next()
        }
    }
}