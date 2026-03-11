package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.RolesEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface RolesRepository extends CrudRepository<RolesEntity, UUID> {
    Optional<RolesEntity>findByName(String name);
}
