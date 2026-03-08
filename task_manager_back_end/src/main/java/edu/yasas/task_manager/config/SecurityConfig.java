package edu.yasas.task_manager.config;

import edu.yasas.task_manager.exceptions.CustomAccessDeniedHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Component
public class SecurityConfig {

    private String[] publicUrls = {
            "/api/v1/user/persist"
    };

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity){
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsConfig-> corsConfig.configurationSource((request)->{
                    CorsConfiguration corsConfiguration = new CorsConfiguration();
                    corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));
                    corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
                    corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
                    corsConfiguration.setMaxAge(10L);
                    return  corsConfiguration;
                })).authorizeHttpRequests(requests ->
                    requests.requestMatchers(publicUrls).permitAll()
                            .anyRequest().authenticated()
                );
        httpSecurity.formLogin(withDefaults());
        httpSecurity.httpBasic(withDefaults());
        httpSecurity.exceptionHandling(exceptionHandlingConfig ->
                exceptionHandlingConfig.accessDeniedHandler(new CustomAccessDeniedHandler()));
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



}
