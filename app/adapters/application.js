import DS from 'ember-data';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from "myapp-webclient/config/environment";
import urlJoin from "npm:url-join";

export default DS.RESTAdapter.extend( DataAdapterMixin, {
    host: ENV.APP.apiHost,
    namespace: ENV.APP.apiNamespace,
    authorizer: 'authorizer:myapp-api',

    getRequest(path, data) {
        let url = urlJoin(ENV.APP.apiHost, ENV.APP.apiNamespace, path);

        this.ajax(url, 'GET', { data: data });
    },

    sendData(method, path, data, customRequestArguments) {
        let url = urlJoin(ENV.APP.apiHost, ENV.APP.apiNamespace, path);
        let requestArguments = Ember.$.extend({ data: data }, customRequestArguments);

        return this.ajax(url, method, requestArguments);
    },

    postRequest(path, data, customRequestArguments = {}) {
        return this.sendData('POST', path, data, customRequestArguments);
    },

    putRequest(path, data, customRequestArguments = {}) {
        return this.sendData('PUT', path, data, customRequestArguments);
    }
});
