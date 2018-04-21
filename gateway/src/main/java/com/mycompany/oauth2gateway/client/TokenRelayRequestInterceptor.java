package com.mycompany.oauth2gateway.client;

import java.util.Optional;

import com.mycompany.oauth2gateway.security.oauth2.AuthorizationHeaderUtil;

import feign.RequestInterceptor;
import feign.RequestTemplate;

public class TokenRelayRequestInterceptor implements RequestInterceptor {

    public static final String AUTHORIZATION = "Authorization";

    private final AuthorizationHeaderUtil authorizationHeaderUtil;
    
    public TokenRelayRequestInterceptor(AuthorizationHeaderUtil authorizationHeaderUtil) {
		super();
		this.authorizationHeaderUtil = authorizationHeaderUtil;
	}


	@Override
    public void apply(RequestTemplate template) {
        Optional<String> authorizationHeader = authorizationHeaderUtil.getAuthorizationHeaderFromOAuth2Context();
		if (authorizationHeader.isPresent()) {
            template.header(AUTHORIZATION, authorizationHeader.get());
        }
    }
}
