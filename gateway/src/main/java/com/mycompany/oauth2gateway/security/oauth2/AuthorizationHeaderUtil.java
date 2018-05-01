package com.mycompany.oauth2gateway.security.oauth2;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.http.AccessTokenRequiredException;
import org.springframework.security.oauth2.client.resource.UserRedirectRequiredException;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AuthorizationHeaderUtil {

    private final Logger log = LoggerFactory.getLogger(getClass());
	
    private final OAuth2RestTemplate oAuth2RestTemplate;

    public AuthorizationHeaderUtil(OAuth2RestTemplate oAuth2RestTemplate) {
		super();
		this.oAuth2RestTemplate = oAuth2RestTemplate;
	}
    
    /*
     * 
     * ONLY USEFULL for TokenRelayRequestInterceptor now : 
     * For @AuthorizedFeignClient annotated Feign Client in the gateway ...
     * 
     * Does the gateway need explicit FeignClient ?
     * 
     * 
     */

	/*
     *  In a gateway the access_token is above all in the OAuth2ClientContext, because a gateway is a "OAuth2 Client" 
     *  And a OAuth2RestTemplate already know how to refresh the OAuth2ClientContext
     *    (if there is a AccessTokenProviderChain configured on it)
     */
    
    public Optional<String> getAuthorizationHeaderFromOAuth2Context() {
    	
    	log.debug("Extracting Access_token");
    	
        OAuth2AccessToken previousAccessToken = oAuth2RestTemplate.getOAuth2ClientContext().getAccessToken();
		if (previousAccessToken == null) {
			log.debug("No valid Access_token...");
			// Question : is there valid use cases where zuul should allow the forwarding of a request without the OAuth2 context set ?
			
			// For the moment : let the downstream micro-service to potentially send an error if the request is lacking an Access_token
			return Optional.empty();
					
		} else {
        	OAuth2AccessToken accessToken;
        	try {
        		// Get the token from OAuth2ClientContext and **refresh** it if necessary
				accessToken = oAuth2RestTemplate.getAccessToken();
        	} catch(UserRedirectRequiredException e) {
        		// It's a refresh failure (because previous token wasn't null)
        		
        		// If it's an AJAX Request : we should send a 401 error :
        		// This should work (TESTME)
        		throw new AccessTokenRequiredException(null); // TODO : CHANGE Exception ??
        		
        		// TODO If it is an http request, we should just rethrow it 
//        		throw e;
        	}
            
    		String tokenType = accessToken.getTokenType();
    		if (!StringUtils.hasText(tokenType)) {
    			tokenType = OAuth2AccessToken.BEARER_TYPE;
    		}
			String authorizationHeaderValue = String.format("%s %s", tokenType, accessToken.getValue());
			
	    	log.debug("Returning Access_token : {}",authorizationHeaderValue);
			
			return Optional.of(authorizationHeaderValue);
		}
    }
	
}
