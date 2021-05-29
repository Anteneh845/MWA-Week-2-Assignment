angular
    .module("meanGuitars")
    .controller("LoginController", LoginController)

function LoginController(GuitarDataFactory) {
    let vm = this;
    vm.loginHandler = function () {
        vm.successMessage = "";
        vm.errorMessage = "";
        if (vm.form.$valid) {
            let user = {
                email: vm.email,
                password: vm.password,
            }
            GuitarDataFactory
                .authenticateUser(user)
                .then(resp => {
                    console.log(resp)
                    if (resp)
                        vm.successMessage = "Successfully Authenticated"
                    else
                        vm.errorMessage = "Invalid Email/Password Combination"
                })
                .catch(console.error)
        } else {

        }
    }
}