package edu.yasas.task_manager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "task_table")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private UUID id;

    private String title;

    private String description;

    private String status; //IN_PROGRESS,DONE,to do are the status

    private String priority; //HIGH,MEDIUM,LOW

    private LocalDate dueDate;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private UserEntity userEntity;

}
