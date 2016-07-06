import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        signup(btn) {
            let $btn = btn.button('loading').attr('disabled', 'disabled');
            let data = this.get('model');
            let that = this;

            this.store.adapterFor('application')
            .postRequest('signup', data)
            .then(function(response){
                that.toggleProperty('resetSignup');
                that.send('handleSuccess', response.message);
                that.transitionToRoute('login');
            })
            .catch((reason) => {
                that.send('handleError', reason);
            })
            .finally(function(){
                $btn.button('reset');
            });
            return false;
        }
    }
});
