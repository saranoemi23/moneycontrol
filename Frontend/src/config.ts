import {environment} from "./environments/environment"
export const config = {
    backendURL: function() {
        if (environment.production) {
            return `${location.protocol}//${location.hostname}/api`;
        }
        return `${location.protocol}//${location.hostname}:3000/api`;
    },
    frontendURL: function() {
        if (environment.production) {
            return `${location.protocol}//${location.hostname}`;
        }
        return `${location.protocol}//${location.hostname}:4200`;
    }
}
