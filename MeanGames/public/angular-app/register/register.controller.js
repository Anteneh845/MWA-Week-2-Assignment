angular.module("meanGames")
    .controller("RegisterController", RegisterController);

function RegisterController(GameDataFactory, $location) {
    let vm = this;
    vm.registerHandler = () => {
        if (vm.form.$valid) {
            if (vm.password !== vm.confirmPassword)
                vm.error = "Passwords don't match"
            else {
                let user = {
                    name: vm.name,
                    userName: vm.userName,
                    password: vm.password
                }
                GameDataFactory
                    .registerUser(user)
                    .then(() => vm.message="Successfully registered user")
                    .catch()
            }
        } else {
            if (!vm.userName || !vm.password)
                vm.error = "Please add a username and password";
        }
    }
}
