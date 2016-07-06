import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service('session'),

    actions: {
        authenticate(btn) {
            let $btn = btn.button('loading').attr('disabled', 'disabled');
            let { email, password, rememberMe } = this.get('model');
            let that = this;

            this.get('session')
            .authenticate('authenticator:myapp-api', email, password, rememberMe)
            .catch((reason) => {
                that.send('handleError', reason);
            })
            .finally(function(){
                $btn.button('reset');
            });
        }
    }
});
