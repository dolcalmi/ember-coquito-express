import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
    tokenAttributeName: 'token',

    authorize(data, block) {
        const tokenAttributeName = this.get('tokenAttributeName');
        const userToken          = data[tokenAttributeName];

        if (!Ember.isEmpty(userToken)) {
            block('Authorization', `Bearer ${userToken}`);
      }
    }
});
