angular
    .module("meanGames")
    .controller("LoginController", LoginController);

function LoginController(GameDataFactory) {
    let vm = this;
    vm.loginHandler = function () {
        vm.errorMessage =""
        vm.message =""
        if (vm.form.$valid) {
            let user = {
                userName: vm.userName,
                password: vm.password,
            }
            GameDataFactory
                .authenticateUser(user)
                .then(resp => {
                    console.log(resp)
                    if (resp)
                        vm.message = "Successfully Authenticated User";
                    else
                        vm.errorMessage = "Invalid Username/Password"

                })
                .catch(err =>console.log(err) )
        } else {

        }
    }
}