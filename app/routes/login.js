import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    model () {
        return {
            email : 'john.doe@gmail.com',
            password : '123456'
        };
    }
});
