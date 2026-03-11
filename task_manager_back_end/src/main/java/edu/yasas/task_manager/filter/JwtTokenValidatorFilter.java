package edu.yasas.task_manager.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;


public class JwtTokenValidatorFilter extends OncePerRequestFilter {



    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException
    {
        String jwtToken = request.getHeader("Authorization");

        try{
            if (jwtToken != null && jwtToken.startsWith("Bearer ")){

                jwtToken = jwtToken.substring(7);

                Environment environment = getEnvironment();
                String secretKey = environment.getProperty("JWT_SECRET_KEY");

                SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

                Claims claims =
                        Jwts.parser().verifyWith(key).build()
                                .parseSignedClaims(jwtToken).getPayload();

                String username = String.valueOf(claims.get("username"));
                String authorities = String.valueOf(claims.get("authorities"));

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);


            }

        } catch (Exception e) {
            throw new BadCredentialsException("Invalid Token Provided");
        }

        filterChain.doFilter(request,response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String path = request.getServletPath();
        return path.equals("/authenticate/admin/login")
                || path.equals("/authenticate/user/login")
                || path.equals("/api/v1/user/persist");
        //This filter will execute every other scenarios except log in and register
    }

}
