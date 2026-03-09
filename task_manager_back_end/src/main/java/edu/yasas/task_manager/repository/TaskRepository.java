package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Iterable<TaskEntity>findAllByUserEntityId(UUID id);

    @Modifying
    @Transactional
    @Query("DELETE FROM TaskEntity t WHERE t.userEntity.id = :userId")
    void deleteAllByUserEntityId(@Param("userId") UUID userId);


}
