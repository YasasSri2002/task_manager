package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity,UserEntity> {
}
