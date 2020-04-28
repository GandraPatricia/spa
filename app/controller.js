(function () {

    'user strict';

    var spaApp = angular.module("spaApp");
    spaApp.controller('produtoController', produtoController);
    produtoController.$inject = ['$scope','$http'];

    function produtoController($scope,$http) {
        var vm = this;
        vm.produto = {};
        vm.produtos = [];

        vm.init= function(){
            vm.listarProdutos()
        };

        vm.listarProdutos = function(){
            $http.get('http://localhost:3000/produtos').then(
                function(response){
                    console.log(response);
                    vm.produtos = response.data;
                }, 
                function(error){

                }
            )
        };

        vm.adicionarProduto = function () {
            if(vm.produto.id != undefined){
                vm.atualizarItem(vm.produto, vm.produto.id);
                vm.limparCampos();
            }else{
              //  vm.produtos.push(angular.copy(vm.produto));
               // vm.limparCampos();
               vm.salvarProdutoBaseDados();
            }
        };
        vm.salvarProdutoBaseDados = function(){
            $http.post('http://localhost:3000/produtos',vm.produto).then(
                function(response){
                    console.log(response);
                    vm.produtos.push(vm.produto);
                    vm.limparCampos();
                }, 
                function(error){

                }
            )
        };

        vm.limparCampos = function () {
            vm.produto = {};
        };

        vm.deletarItem = function(index){
            vm.produtos.splice(index, 1);
        };

        vm.carregarItem = function(index){
            vm.produto = {
                id: index,
                nome: vm.produtos[index].nome,
                preco: vm.produtos[index].preco
            };
        };

        vm.atualizarItem = function(item, index){   
            if(index === item.id){
                vm.produtos[index] = item;
            }
        };
    }
}());
