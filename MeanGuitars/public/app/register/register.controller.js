angular
    .module("meanGuitars")
    .controller("RegisterController", RegisterController);

function RegisterController(GuitarDataFactory, $location) {
    let vm = this;
    vm.registerHandler = () => {
        if (vm.form.$valid) {
            if (vm.password !== vm.confirmPassword)
                vm.error = "Passwords don't match"
            else {
                let user = {
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email,
                    password: vm.password
                }
                GuitarDataFactory
                    .registerUser(user)
                    .then(() => vm.message = "Successfully Registered user")
                    .catch()
            }
        } else {
            if (!vm.userName || !vm.password)
                vm.error = "Please add a username and password";
        }
    }
}
