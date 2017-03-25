import simpleOauth2 from "simple-oauth2";
import Logger from './Logger';

function noop() {
}

export default class OAuth2Util {

    /*
     Constructor to initialize the OAuth2Util
     */
    constructor(config = {}) {
        this.logger = config.logger || new Logger();
        this.logger.debug('Initializing OAuth2Util');

        this.credentials = {
            client: {
                id: config.client_id,
                secret: config.client_secret
            },
            auth: {
                tokenHost: config.access_token_uri
            }
        };

        this.oauth2 = simpleOauth2.create(this.credentials);
        this.token = {};
    }

    /*
     Get Access Token for the Client Credentials via OAuth2 Authentication
     */
    getTokenForClientCredentials(callback = noop) {
        const tokenConfig = {};
        this.oauth2.clientCredentials.getToken(tokenConfig, (error, result) => {
            if (error) {
                this.logger.warn('Error occurred while getting Access Token via OAuth2 Client Credentials', error);
            } else {
                this.token = this.oauth2.accessToken.create(result).token;
                this.logger.debug('Access Token has been fetched using Client Credentials');
            }

            return callback(error, this.token);
        });
    }
}