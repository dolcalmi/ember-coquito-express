import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model(){
        //just harcoded params, use query params to improve this
        return this.get('store').query('user', { page: {page:1, pageSize:100}, sort:'-createdAt', /*filter: { firstName: 'name' }*/ });
    }
});
