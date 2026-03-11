package edu.yasas.task_manager.config;

import edu.yasas.task_manager.entity.AdminEntity;
import edu.yasas.task_manager.entity.RolesEntity;
import edu.yasas.task_manager.exceptions.RoleNotFoundException;
import edu.yasas.task_manager.repository.AdminRepository;
import edu.yasas.task_manager.repository.RolesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(2)
public class SuperAdminFeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
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
        if(adminRepository.findByEmail(email).isEmpty()){

            AdminEntity adminEntity = new AdminEntity();
            adminEntity.setEmail(email);
            String encodedPassword = passwordEncoder.encode(password);
            adminEntity.setPassword(encodedPassword);
            adminEntity.setUsername(username);
            RolesEntity role = rolesRepository.findByName("ROLE_SUPER_ADMIN")
                    .orElseThrow(() -> new RoleNotFoundException("Role not found"));
            adminEntity.setAuthorities(Set.of(role));
            AdminEntity save = adminRepository.save(adminEntity);
            log.info(save.getEmail());
        }
    }
}
