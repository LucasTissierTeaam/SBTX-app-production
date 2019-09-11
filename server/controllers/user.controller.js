const bcrypt = require('bcrypt');
const { getUsers, deleteUser, addVisiteUser, updatePassWord } = require('../queries/users.queries');

exports.usersList = async(req, res, next) => {
    try{
        const Users = await getUsers();
        res.json(Users);
    }catch(e){
        next(e);
    }
}

exports.userDelete = async(req, res, next) => {
    try{
        const userId = req.params.userId;
        await deleteUser(userId);
        res.status(200);
        res.end();
    } catch(e) {
        next(e);
    }
}

exports.userVisite = async(req, res, next) => {
    const userId = req.params.userId;
    try{
        const body = req.body;
        console.log(body);
        await addVisiteUser(userId, body);
        res.status(200);
        res.end();

    }catch(e){
        next(e);
    }
}

exports.userChangePassword = async(req, res, next) => {
    try{
        const body = req.body;
        const userId = req.params.userId;
        const currentUserPassword = body.currentUserPassword;
        const oldPassword= body.formValue.oldPassword;
        const password = body.formValue.password;
        const confirmPassword = body.formValue.confirmPassword;
        if (bcrypt.compareSync(oldPassword, currentUserPassword)){
            if (password === confirmPassword){
                await updatePassWord(userId, password);
                res.status(200);
                res.end();
            }else{
                throw e = 'Erreur de frape entre les deux nouveaux password';
            }
        }else{
            throw e = 'L\'ancien mot de pass ne match pas...';
        }
    }catch(e){
        next(e);
    }
}
