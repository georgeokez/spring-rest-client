'use strict';

angular.module('myApp').controller('UserController', ['$scope', '$log', 'UserService', function($scope, $log, UserService) {
    var self = this;
    self.user={id:null,firstname:'',lastname:'',email:'',age:null};
    self.users=[];

    self.submit = submit;
    self.edit = edit;
    self.remove = remove;
    self.reset = reset;


    fetchAllUsers();

    function fetchAllUsers(){
        UserService.fetchAllUsers()
            .then(
            function(data) {
                self.users = data;
            },
            function(errResponse){
                console.error('Error while fetching Users');
            }
        );
    }

    function getAllUsers(){
        UserService.fetchAllUsers()
            .then(
                function(){
                    self.users = data;
                },
                function (errorResponse) {
                    console.error('Error occur ');

                }
            );
    }

    function createUser(user){
        UserService.createUser(user)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while creating User');
            }
        );
    }

    // my won clone of the method
    function createNewUser(){
        UserService.createUser(user)
            .then(
                fetchAllUsers,
                function (errResponse) {
                    console.error('Error occur');
                }
            );
    }

    function updateUser(user, id){
        UserService.updateUser(user, id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }

    // my won clone of the method
    function updateTheUser(user, id) {
        UserService.update(user)
            .then(
                fetchAllUsers,
                function (errorResponse) {
                    console.error('Error while updating User');
                }
            );
    }

    function deleteUser(id){
        UserService.deleteUser(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }

    // my won clone of the method
    function deleteAUser(id) {
        UserService.deleteTheUser()
            .then(
                fetchAllUsers,
                function (reason) {
                    console.error('An error occured while deleting user ');
                }
            );
    }

    function submit() {
        if(self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
            updateUser(self.user, self.user.id);
            console.log('User updated with id ', self.user.id);
        }
        reset();
    }

    function submitThe() {
        if (self.user.id===null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        } else{
            updateUser(self.user, self.user.id);
            console.log('User update with id ', self.user.id);
        }
        reset();
    }

    function submit(){
        if(self.user.id == null){
            console.log('Saving New User', self.user);
            createUser(self.user);
        }else{
            updateUser(self.user);
            console.lo()
        }
    }

    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < self.users.length; i++){
            if(self.users[i].id === id) {
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }

    function editThe(id) {
        console.log('id to be edited', id);
        for (var i = 0; i < self.users.length; i++){
            if(self.user[i].id === id){
                self.user = angular.copy(self.users[i]);
                break;
            }
        }
    }

    function remove(id){
        console.log('id to be deleted', id);
        if(self.user.id === id) {//clean form if the user to be deleted is shown there.
            reset();

        }
        deleteUser(id);
    }


    function reset(){
        self.user={id:null,firstname:'',lastname:'',email:'',age:null};
        $scope.myForm.$setPristine(); //reset Form
    }

}]);
