package com.flowfit.backendflowfit.controllers;


import com.flowfit.backendflowfit.AdminAuth.AuthRequestAdmin;
import com.flowfit.backendflowfit.AdminAuth.AuthResponseAdmin;
import com.flowfit.backendflowfit.model.Admin;
import com.flowfit.backendflowfit.model.Client;
import com.flowfit.backendflowfit.services.AdminService;
import com.flowfit.backendflowfit.services.ClientService;
import com.flowfit.backendflowfit.utils.TokenGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminService adminService;
    private final ClientService clientService;

    public AdminController(AdminService adminService, ClientService clientService) {
        this.adminService = adminService;
        this.clientService = clientService;
        
    }


    @PutMapping("/{id}/verify")
    public ResponseEntity<Map<String, String>> verifyClient(@PathVariable Integer id) {
        Client client = clientService.getClientById(id);

        if (client == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, String> response = new HashMap<>();

        if (client.getStatus() == Client.ClientStatus.ACTIVE) {
            try {
                clientService.updateClientPoints(client.getId());
                clientService.changeClientStatusInGym(client.getId(), Client.ClientStatusInGym.INSIDEGYM);
                response.put("message", "true");
            } catch (RuntimeException e) {
                response.put("message", e.getMessage());
            }
        } else {
            response.put("message", "false");
        }

        response.put("status", client.getStatus().toString());

        return ResponseEntity.ok(response);
    }


    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.findAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateClient(@PathVariable Integer id) {
        try {
            adminService.deactivateClient(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/suspend")
    public ResponseEntity<Void> suspendClient(@PathVariable Integer id) {
        try {
            adminService.suspendClient(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
        adminService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateClient(@PathVariable Integer id) {
        try {
            adminService.activateClient(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/updateClient")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody Client updatedClient) {
        Client existingClient = clientService.getClientById(id);
        if (existingClient == null) {
            return ResponseEntity.notFound().build();
        }

        // Atualiza os campos do cliente existente com os dados do updatedClient
        existingClient.setEmail(updatedClient.getEmail());
        existingClient.setFirstName(updatedClient.getFirstName());
        existingClient.setLastName(updatedClient.getLastName());
        existingClient.setPhoneNumber(updatedClient.getPhoneNumber());
        // Não atualizamos a senha aqui, isso deve ser feito em um endpoint separado por questões de segurança

        // Atualiza o cliente no banco de dados
        Client updatedClientResult = clientService.updateClient(existingClient);
        return ResponseEntity.ok(updatedClientResult);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponseAdmin> authenticateAdmin(@RequestBody AuthRequestAdmin authRequestAdmin) {
        boolean isAuthenticated = adminService.authenticateAdmin(authRequestAdmin.getEmail(), authRequestAdmin.getPassword());

        if (!isAuthenticated) {
            return ResponseEntity.ok(new AuthResponseAdmin(false, null));
        }
        String token = TokenGenerator.generateToken();

        return ResponseEntity.ok(new AuthResponseAdmin(true, token));

    }


}
