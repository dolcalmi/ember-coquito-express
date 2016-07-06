import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    session: Ember.inject.service('session'),
    i18n: Ember.inject.service(),

    afterModel: function() {
        console.dir(this.get('session'));
        this.set('i18n.locale', this.calculateLocale());
    },

    calculateLocale() {
        // whatever you do to pick a locale for the user:
        let locale = navigator.languages[0] || navigator.language || navigator.userLanguage || 'en';
        return this.get('i18n.locales').indexOf(locale) >= 0 ? locale : 'en';
    },

    actions: {

        logout() {
            this.get('session').invalidate();
            //although invalidate redirects to login we do it here to make it smoothly
            this.transitionTo('login');
        },

        handleError(reason) {
            let controller = this.controllerFor('application');
            controller.set('errorMessage', reason.errors[0].message);
            Ember.run.later(function(){
                Ember.$("#errorMessage").fadeOut("slow", function() {
                    controller.set('errorMessage', null);
                });
            },3000);
        },

        handleSuccess(message) {
            let controller = this.controllerFor('application');
            controller.set('successMessage', message );
            Ember.run.later(function(){
                Ember.$("#successMessage").fadeOut("slow", function() {
                    controller.set('successMessage', null);
                });
            },3000);
        }
    }
});
