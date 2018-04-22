package com.mycompany.oauth2gateway.config;

import com.mycompany.oauth2gateway.security.AuthoritiesConstants;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.filter.CorsFilter;

import io.github.jhipster.security.AjaxLogoutSuccessHandler;

@EnableOAuth2Sso
@Configuration
public class OAuth2SsoConfiguration extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;

    public OAuth2SsoConfiguration(
              CorsFilter corsFilter) {
        this.corsFilter = corsFilter;
    }
    
    @Bean
    public AjaxLogoutSuccessHandler ajaxLogoutSuccessHandler() {
        return new AjaxLogoutSuccessHandler();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
	        .csrf()
	        	.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
	    .and()
            .addFilterBefore(corsFilter, CsrfFilter.class)
            .headers()
            .frameOptions()
            .disable()
        .and()
            .logout()
            .logoutUrl("/api/logout")
            .logoutSuccessHandler(ajaxLogoutSuccessHandler())
        .and()
            .authorizeRequests()
            .antMatchers("/api/profile-info").permitAll()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            .anyRequest().permitAll();
    }
    
    @Bean
    public OAuth2RestTemplate oAuth2RestTemplate(
        OAuth2ProtectedResourceDetails oAuth2ProtectedResourceDetails,
        OAuth2ClientContext oAuth2ClientContext
    ) {
        return new OAuth2RestTemplate(oAuth2ProtectedResourceDetails, oAuth2ClientContext);
    }
    
}
