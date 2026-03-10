package edu.yasas.task_manager.config;

import edu.yasas.task_manager.entity.AdminEntity;
import edu.yasas.task_manager.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
@Component
@RequiredArgsConstructor
@Slf4j
public class SuperAdminFeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

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
            adminEntity.setRole("ROLE_SUPER_ADMIN");
            AdminEntity save = adminRepository.save(adminEntity);
            log.info(save.getEmail());
        }
    }
}
