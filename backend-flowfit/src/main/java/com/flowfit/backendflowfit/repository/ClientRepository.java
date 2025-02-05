package com.flowfit.backendflowfit.repository;

import com.flowfit.backendflowfit.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByEmail(String email);

    List<Client> findByInsideGym(Client.ClientStatusInGym insideGym);
}