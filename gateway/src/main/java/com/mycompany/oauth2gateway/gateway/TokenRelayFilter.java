package com.mycompany.oauth2gateway.gateway;

import com.mycompany.oauth2gateway.security.oauth2.AuthorizationHeaderUtil;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public class TokenRelayFilter extends ZuulFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    
    private final AuthorizationHeaderUtil authorizationHeaderUtil;
    
    public TokenRelayFilter(AuthorizationHeaderUtil authorizationHeaderUtil) {
		super();
		this.authorizationHeaderUtil = authorizationHeaderUtil;
	}

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        // Add specific authorization headers for OAuth2
        Optional<String> authorizationHeader = authorizationHeaderUtil.getAuthorizationHeaderFromOAuth2Context();
		if (authorizationHeader.isPresent()) {
            ctx.addZuulRequestHeader(AUTHORIZATION_HEADER,authorizationHeader.get());
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 10000;
    }
}
