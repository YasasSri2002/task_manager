package edu.yasas.task_manager.config;

import edu.yasas.task_manager.entity.RolesEntity;
import edu.yasas.task_manager.entity.UserEntity;
import edu.yasas.task_manager.exceptions.RoleNotFoundException;
import edu.yasas.task_manager.repository.RolesRepository;
import edu.yasas.task_manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(2)
public class SuperAdminFeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolesRepository rolesRepository;

    @Value("${SUPER_ADMIN_EMAIL}")
    private String email;

    @Value("${SUPER_ADMIN_PASSWORD}")
    private String password;

    @Value("${SUPER_ADMIN_USERNAME}")
    private String username;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.findByEmail(email).isEmpty()){

            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(email);
            String encodedPassword = passwordEncoder.encode(password);
            userEntity.setPassword(encodedPassword);
            userEntity.setUsername(username);
            RolesEntity role = rolesRepository.findByName("ROLE_SUPER_ADMIN")
                    .orElseThrow(() -> new RoleNotFoundException("Role not found"));
            userEntity.setAuthorities(Set.of(role));
            UserEntity save = userRepository.save(userEntity);
            log.info(save.getEmail());
        }
    }
}
