package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends CrudRepository<TaskEntity, UUID> {
}
