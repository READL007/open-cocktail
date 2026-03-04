from mozilla_django_oidc.auth import OIDCAuthenticationBackend

class KeycloakOIDCBackend(OIDCAuthenticationBackend):
    def get_or_create_user(self, access_token, id_token, payload):
        # Store the raw access token in the session
        # so Django views can forward it to Express
        request = self.request
        if request:
            request.session['access_token'] = access_token
        return super().get_or_create_user(access_token, id_token, payload)
    
    #logout user from Django and Keycloak
    def logout(self, request):
        # Clear the Django session
        request.session.flush()
        
        # Return to home page after logout
        return request.build_absolute_uri('/')  # Redirect to home page after logout