(function () {

    'user strict';

    var spaApp = angular.module("spaApp");
    spaApp.controller('produtoController', produtoController);
    produtoController.$inject = ['$scope', '$http'];

    function produtoController($scope, $http) {
        var vm = this;
        vm.produto = {};
        vm.produtos = [];
        var HTTP_HOST = 'http://localhost:3000';

        vm.init = function () {
            vm.listarProdutos();
        };

        vm.listarProdutos = function () {
            $http.get(HTTP_HOST + '/produtos').then(
                function (response) {
                    vm.produtos = response.data;
                },
                function (error) {
                    alert('Erro ao recuperar produtos');
                }
            );
        };

        vm.adicionarProduto = function () {
            if (vm.produto._id != undefined) {
                vm.atualizarItem(vm.produto, vm.produto.index);
                vm.limparCampos();
            } else {
                //  vm.produtos.push(angular.copy(vm.produto));
                // vm.limparCampos();
                vm.salvarProdutoBaseDados();
            }
        };
        vm.salvarProdutoBaseDados = function () {
            $http.post(HTTP_HOST + '/produtos', vm.produto).then(
                function (response) {
                    vm.produtos.push(response.data.produtoCriado);
                    vm.limparCampos();
                },
                function (error) {
                    alert('Erro ao inserir produto');
                }
            );
        };

        vm.limparCampos = function () {
            vm.produto = {};
        };

        vm.deletarItem = function (item, index) {
            $http.delete(HTTP_HOST+'/produtos/'+ item._id).then(
                function(response){
                    vm.produtos.splice(index, 1);
                    vm.limparCampos();
                }, 
                function(error){
                    alert('Erro ao deletar produto');
                }
            );
        };

        vm.carregarItem = function (item, index) {
            vm.produto = {
                _id: item._id,
                nome: item.nome,
                preco: item.preco,
                index: index
            };
        };

        vm.atualizarItem = function (item, index) {
            $http.put(HTTP_HOST + '/produtos/' + item._id, item).then(
                function (response) {
                    vm.produtos[index] = item;
                    vm.limparCampos();
                },
                function (error) {
                    alert('Erro ao atualizar produto');
                }
            );
        };
    }
}());
