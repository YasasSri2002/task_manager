package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.AdminEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface AdminRepository extends CrudRepository<AdminEntity, UUID> {

    Optional<AdminEntity>findByEmail(String email);

}
