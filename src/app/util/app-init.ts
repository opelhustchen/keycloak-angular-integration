import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: {
            // onLoad: 'login-required',
            checkLoginIframe: true,
            checkLoginIframeInterval: 25
        },
        loadUserProfileAtStartUp: true
    }
    return (): Promise<any> => keycloak.init(options);
}