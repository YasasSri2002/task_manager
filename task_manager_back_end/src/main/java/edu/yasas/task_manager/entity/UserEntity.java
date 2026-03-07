package edu.yasas.task_manager.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "user_table")
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    private UUID id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String role = "user";

    private String password;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<TaskEntity> taskEntityList;


}
