package edu.yasas.task_manager.config;

import edu.yasas.task_manager.entity.RolesEntity;
import edu.yasas.task_manager.repository.RolesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Order(1)
public class RolesInitializer implements CommandLineRunner {

    private final RolesRepository rolesRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> roles = List.of("ROLE_USER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN");
        for (String roleName : roles) {
            if (rolesRepository.findByName(roleName).isEmpty()) {
                rolesRepository.save(RolesEntity.builder().name(roleName).build());
            }
        }
    }
}
