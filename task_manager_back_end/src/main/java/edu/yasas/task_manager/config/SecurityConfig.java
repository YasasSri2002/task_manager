package edu.yasas.task_manager.config;

import edu.yasas.task_manager.exceptions.handler.CustomAccessDeniedHandler;
import edu.yasas.task_manager.filter.JwtTokenValidatorFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Component
@EnableMethodSecurity
public class SecurityConfig {

    private String[] publicUrls = {
            "/api/v1/user/persist",
            "/authenticate/**"
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
                }))
                .addFilterBefore(new JwtTokenValidatorFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(requests ->
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


    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService , PasswordEncoder passwordEncoder
    ){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);

    }


}
