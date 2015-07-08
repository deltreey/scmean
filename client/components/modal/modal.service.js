'use strict';

angular.module('scmeanApp')
  .factory('Modal', function ($rootScope, $modal, $sce, Build) {
    var _ = $rootScope._;
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      },

      input: {
        createRepository: function (callback) {
          callback = callback || angular.noop;

          return function() {
            var createModal;
            var modal = {
              dismissable: true,
              title: 'New Repository',
              text: 'What do you want to name your new repository?',
              input: { value: 'test' },
              buttons: [{
                classes: 'btn-success',
                text: 'Create',
                click: function() {
                  createModal.close(modal.input.value);
                }
              },{
                classes: 'btn-default',
                text: 'Cancel',
                click: function(e) {
                  createModal.dismiss(e);
                }
              }]
            };

            createModal = openModal({
              modal: modal
            }, 'modal-success');

            createModal.result.then(function(inputValue) {
              callback.apply(null, [inputValue]);
            });
          };
        },
        createHook: function (callback) {
          callback = callback || angular.noop;

          return function() {
            var createModal;

            Build.query(function (builds) {
              var modal = {
                dismissable: true,
                title: 'New Hook',
                selectables: [{
                  name: 'Branch: ',
                  options: ['master'],
                  value: 'master'
                },{
                  name: 'Build: ',
                  options: _.pluck(builds, 'name'),
                  value: builds[0].name
                },{
                  name: 'HookType: ',
                  options: ['update'],
                  value: 'update'
                }],
                buttons: [{
                  classes: 'btn-success',
                  text: 'Create',
                  click: function() {
                    var build = _.find(builds, { name: modal.selectables[1].value });
                    createModal.close([
                      modal.selectables[2].value,
                      build._id,
                      _.pluck(modal.selectables, 'value')
                    ]);
                  }
                },{
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    createModal.dismiss(e);
                  }
                }]
              };

              createModal = openModal({
                modal: modal
              }, 'modal-success');

              createModal.result.then(function(results) {
                callback.apply(null, [results[0], results[1], results[2][0]]);
              });
            });
          };
        }
      }
    };
  });
