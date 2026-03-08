package edu.yasas.task_manager.service.impl;

import edu.yasas.task_manager.dto.request.LoginRequestDto;
import edu.yasas.task_manager.dto.response.LoginResponseDto;
import edu.yasas.task_manager.service.AuthenticationService;
import edu.yasas.task_manager.utill.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public ResponseEntity<LoginResponseDto> login(LoginRequestDto loginRequestDto) {

        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequestDto.getUsername(), loginRequestDto.getPassword());

        Authentication authResponse;

        try{
            authResponse = authenticationManager.authenticate(authentication);
        }catch (Exception ex){
            throw new BadCredentialsException("Bad Credentials",ex);

        }

        if(authResponse == null || !authResponse.isAuthenticated()){
            throw new BadCredentialsException("Bad Credentials");
        }

        String token = "Bearer " +  jwtTokenProvider.generateToken(authResponse);

        return ResponseEntity.ok()
                .header("Authorization",token)
                .body(new LoginResponseDto(HttpStatus.OK.getReasonPhrase(),token));
    }
}
