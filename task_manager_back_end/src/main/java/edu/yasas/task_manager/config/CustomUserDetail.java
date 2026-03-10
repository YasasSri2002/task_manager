package edu.yasas.task_manager.config;

import lombok.Getter;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.UUID;

@Getter
public class CustomUserDetail extends User {

    private final UUID userId;

    public CustomUserDetail(
            String username, @Nullable String password,
            Collection<? extends GrantedAuthority> authorities,UUID userId) {
        super(username, password, authorities);
        this.userId = userId;
    }
}
