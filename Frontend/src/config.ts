export const config = {
    backendURL: function() {
        return `${location.protocol}//${location.hostname}:3000`;
    },
    frontendURL: function() {
        return `${location.protocol}//${location.hostname}:4200`;
    }
}
