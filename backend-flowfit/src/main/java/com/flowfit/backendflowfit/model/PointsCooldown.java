package com.flowfit.backendflowfit.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;


@Entity
@Table(name = "points_cooldowns")
public class PointsCooldown {
    @Id
    private Integer clientId;
    private LocalDateTime lastUpdate;

    public PointsCooldown() {}

    public PointsCooldown(Integer clientId) {
        this.clientId = clientId;
    }

    // Getters and setters
    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public LocalDateTime getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDateTime lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}