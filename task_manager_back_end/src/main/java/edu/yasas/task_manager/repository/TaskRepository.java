package edu.yasas.task_manager.repository;

import edu.yasas.task_manager.entity.TaskEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Page<TaskEntity>findAllByUserEntityId(UUID id,Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM TaskEntity t WHERE t.userEntity.id = :userId")
    void deleteAllByUserEntityId(@Param("userId") UUID userId);

    Page<TaskEntity> findByStatusAndPriority(String status, String priority, Pageable pageable);

    Page<TaskEntity> findByStatus(String status, Pageable pageable);

    Page<TaskEntity> findByPriority(String priority, Pageable pageable);

    Page<TaskEntity> findByUserEntityIdAndStatusAndPriority(UUID id,String status, String priority, Pageable pageable);

    Page<TaskEntity> findByUserEntityIdAndStatus(UUID id,String status, Pageable pageable);

    Page<TaskEntity> findByUserEntityIdAndPriority(UUID id,String priority, Pageable pageable);


}
