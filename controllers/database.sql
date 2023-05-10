CREATE DATABASE LoginSignup;

USE LoginSignup;

CREATE TABLE users(
    id integer PRIMARY KEY AUTO_INCREMENT,
    username TEXT(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passcode VARCHAR(100) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

--Insert a dummy user for practice

INSERT INTO users (username, email, passcode)
VALUES
('John Doe', 'john@gmail.com', 'password');