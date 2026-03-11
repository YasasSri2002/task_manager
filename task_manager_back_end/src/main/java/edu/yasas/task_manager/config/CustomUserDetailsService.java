package edu.yasas.task_manager.config;


import edu.yasas.task_manager.entity.UserEntity;


import edu.yasas.task_manager.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService  implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    @NonNull
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("User has not found"));

        List<SimpleGrantedAuthority> grantedAuthorities = user.getAuthorities()
                .stream()
                .map(authority-> new SimpleGrantedAuthority(authority.getName())).toList();

        return new CustomUserDetail(user.getEmail(), user.getPassword() ,
                    grantedAuthorities,user.getId());

    }
}
