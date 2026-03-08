package edu.yasas.task_manager.utill;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;


import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String generateToken(Authentication authentication){

        String username = authentication.getName();

        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        SecretKey key = generateSecretKey();

        return Jwts.builder()
                .issuer("yasas")
                .expiration(new Date(System.currentTimeMillis() + this.expiration))
                .claim("username", username)
                .claim("authorities",authorities)
                .subject("Jwt Token")
                .issuedAt(new Date())
                .signWith(key)
                .compact();
    }

    public SecretKey generateSecretKey(){
        return Keys.hmacShaKeyFor(this.secretKey.getBytes(StandardCharsets.UTF_8));
    }

}
