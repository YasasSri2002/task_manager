CREATE TABLE roles_table (
    id binary(16) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Join Table: Users <-> Roles
CREATE TABLE users_roles (
    user_id binary(16) NOT NULL,
    role_id binary(16) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_users_roles_role
        FOREIGN KEY (role_id) REFERENCES roles_table(id)
);

-- Join Table: Admins <-> Roles
CREATE TABLE admin_roles (
    admin_id binary(16) NOT NULL,
    role_id  binary(16) NOT NULL,
    PRIMARY KEY (admin_id, role_id),
    CONSTRAINT fk_admin_roles_role
        FOREIGN KEY (role_id) REFERENCES roles_table(id)
);

ALTER TABLE `user_table` DROP COLUMN `role`;
ALTER TABLE `admin_table` DROP COLUMN `role`;