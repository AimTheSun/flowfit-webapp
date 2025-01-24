package com.flowfit.sbfitflow.services;

import com.flowfit.sbfitflow.model.Admin;
import com.flowfit.sbfitflow.repository.AdminRepository;
import com.flowfit.sbfitflow.model.Client;
import com.flowfit.sbfitflow.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final ClientRepository clientRepository;

    private final AdminRepository adminRepository;

    private final ClientService clientService;



    public AdminService(ClientRepository clientRepository, AdminRepository adminRepository, ClientService clientService) {
        this.adminRepository = adminRepository;
        this.clientRepository = clientRepository;
        this.clientService = clientService;
    }

    public List<Admin> findAllAdmins() {
        return adminRepository.findAll();
    }


    public boolean authenticateAdmin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        return admin != null && admin.getPassword().equals(password);
    }


    public void updateClient(Client client) {
        clientRepository.save(client);
    }

    public void activateClient(Integer id) {
        Client client = clientService.getClientById(id);
        if (client != null) {
            client.setStatus(Client.ClientStatus.ACTIVE);
            updateClient(client);
        } else {
            throw new RuntimeException("Client not found with id: " + id);
        }
    }

    public void deactivateClient(Integer id) {
        Client client = clientService.getClientById(id);
        if (client != null) {
            client.setStatus(Client.ClientStatus.INACTIVE);
            updateClient(client);
        } else {
            throw new RuntimeException("Client not found with id: " + id);
        }
    }

    public void suspendClient(Integer id) {
        Client client = clientService.getClientById(id);
        if (client != null) {
            client.setStatus(Client.ClientStatus.SUSPENDED);
            updateClient(client);
        } else {
            throw new RuntimeException("Client not found with id: " + id);
        }
    }

    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }







}
