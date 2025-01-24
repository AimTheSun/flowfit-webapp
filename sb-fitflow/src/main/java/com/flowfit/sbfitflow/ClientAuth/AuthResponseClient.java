package com.flowfit.sbfitflow.ClientAuth;


public class AuthResponseClient {

    private boolean authenticated;

    private String token;

    public AuthResponseClient(boolean isAuthenticated, String token) {
        this.authenticated = isAuthenticated;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}