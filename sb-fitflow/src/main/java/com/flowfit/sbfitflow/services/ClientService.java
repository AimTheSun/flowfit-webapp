package com.flowfit.sbfitflow.services;

import com.flowfit.sbfitflow.model.Client;
import com.flowfit.sbfitflow.model.PointsCooldown;
import com.flowfit.sbfitflow.repository.ClientRepository;
import com.flowfit.sbfitflow.repository.PointsCooldownRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final PointsCooldownRepository pointsCooldownRepository;

    public ClientService(ClientRepository clientRepository, PointsCooldownRepository pointsCooldownRepository) {
        this.clientRepository = clientRepository;
        this.pointsCooldownRepository = pointsCooldownRepository;
    }

    public List<Client> findAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Integer id) {
        return clientRepository.findById(id).orElse(null);
    }
    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
    public void createClient(Client client) {
        clientRepository.save(client);
    }

    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }


    public void updateClientPoints(Integer clientId) {
        Client client = getClientById(clientId);
        if (client != null) {
            LocalDateTime now = LocalDateTime.now();
            PointsCooldown cooldown = pointsCooldownRepository.findById(clientId)
                    .orElse(new PointsCooldown(clientId));

            if (cooldown.getLastUpdate() == null || now.isAfter(cooldown.getLastUpdate().plusHours(10))) {
                client.setPoints(client.getPoints() + 1);
                client.setLastPointsUpdate(now);  // Set the last points update time
                clientRepository.save(client);

                cooldown.setLastUpdate(now);
                pointsCooldownRepository.save(cooldown);
            } else {
                throw new RuntimeException("false");
            }
        } else {
            throw new RuntimeException("Client not found with id: " + clientId);
        }
    }



    public boolean authenticateClient(String email, String password) {
        Client client = clientRepository.findByEmail(email);
        return client != null && client.getPassword().equals(password);
    }




}