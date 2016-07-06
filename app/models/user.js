import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    i18n: Ember.inject.service(),

    firstName: attr('string'),
    lastName: attr('string'),
    email: attr('string'),
    lastLoginAt: attr(),

    fullName: Ember.computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
    }),

    status: Ember.computed('lastLoginAt', function() {

        if (this.get('lastLoginAt')) {
            return this.get('i18n').t('index.active');
        }
        return this.get('i18n').t('index.inactive');
    })
});
