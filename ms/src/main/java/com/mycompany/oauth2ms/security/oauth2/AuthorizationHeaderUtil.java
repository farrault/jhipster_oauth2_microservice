package com.mycompany.oauth2ms.security.oauth2;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

public class AuthorizationHeaderUtil {
	
	
    /*
     *  A micro-service is a OAuth2 Resource Server :  
     *  There is no OAuth2ClientContext 
     *  By the accesstoken is accessible in the OAuth2AuthenticationDetails ...
     *     but only because we used a UserInfo Endpoint here
     */

    public static Optional<String> getAuthorizationHeaderFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Object details = authentication.getDetails();
        if (details != null && details instanceof OAuth2AuthenticationDetails) {
            OAuth2AuthenticationDetails oAuth2AuthenticationDetails =
                (OAuth2AuthenticationDetails) details;

            return Optional.of(String.format("%s %s", oAuth2AuthenticationDetails.getTokenType(),
                oAuth2AuthenticationDetails.getTokenValue()));

        } else {
            return Optional.empty();
        }
    }
}
