package com.flowfit.sbfitflow.AdminAuth;

public class AuthResponseAdmin {

    private boolean authenticated;

    private String token;

    public AuthResponseAdmin(boolean isAuthenticated, String token) {
        this.authenticated = isAuthenticated;
        this.token = token;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
