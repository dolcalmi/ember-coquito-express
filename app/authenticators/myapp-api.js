import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

const { RSVP: { Promise }, isEmpty, run } = Ember;
import ENV from "myapp-webclient/config/environment";
import urlJoin from "npm:url-join";

export default Devise.extend({
    serverTokenEndpoint: urlJoin(ENV.APP.apiHost, ENV.APP.apiNamespace, 'login'),

    authenticate(identification, password, rememberMe = false) {
        return new Promise((resolve, reject) => {
            const useXhr = this.get('rejectWithXhr');
            const { identificationAttributeName, tokenAttributeName } = this.getProperties('identificationAttributeName', 'tokenAttributeName');
            const data         = {};
            data['password'] = password ;
            data['rememberMe'] = rememberMe ;
            data[identificationAttributeName] = identification;
            let that = this;
            return this.makeRequest(data).then(
                (response) => {
                    if (that._validate(response)) {
                        const resourceName = this.get('resourceName');
                        const _response = response[resourceName] ? response[resourceName] : response;
                        run(null, resolve, _response);
                    } else {
                        run(null, reject, `Check that server response includes ${tokenAttributeName} and ${identificationAttributeName}`);
                    }
                },
                (xhr) => run(null, reject, useXhr ? xhr : (xhr.responseJSON || xhr.responseText))
            );
        });
    },

    _validate(data) {
        const tokenAttributeName = this.get('tokenAttributeName');
        const identificationAttributeName = this.get('identificationAttributeName');
        const resourceName = this.get('resourceName');
        const _data = data[resourceName] ? data[resourceName] : data;

        return !isEmpty(_data[tokenAttributeName]) && !isEmpty(_data[identificationAttributeName]);
    }
});
