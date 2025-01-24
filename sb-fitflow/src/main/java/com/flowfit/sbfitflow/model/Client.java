package com.flowfit.sbfitflow.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClientStatus status = ClientStatus.INACTIVE;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "points")
    private int points;

    @Column(name = "last_points_update")
    private LocalDateTime lastPointsUpdate;


    private String password;



    public enum ClientStatus {
    ACTIVE, INACTIVE, SUSPENDED
    }


    public Integer getId() {
        return id;
    }

    public ClientStatus getStatus() {
        return status;
    }

    public void setStatus(ClientStatus status) {
        this.status = status;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
    public LocalDateTime getLastPointsUpdate() {
        return lastPointsUpdate;
    }
    public void setLastPointsUpdate(LocalDateTime lastPointsUpdate) {
        this.lastPointsUpdate = lastPointsUpdate;
    }
}