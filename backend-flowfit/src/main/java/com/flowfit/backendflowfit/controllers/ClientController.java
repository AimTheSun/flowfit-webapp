package com.flowfit.backendflowfit.controllers;

import com.flowfit.backendflowfit.ClientAuth.AuthRequestClient;
import com.flowfit.backendflowfit.ClientAuth.AuthResponseClient;
import com.flowfit.backendflowfit.model.Client;
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
@RequestMapping("/clients")
public class ClientController {


    private final ClientService clientService;


    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        List<Client> clients = clientService.findAllClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }


    @PostMapping("/getClientByEmail")
    public ResponseEntity<Client> getClientByEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null) {
            return ResponseEntity.badRequest().build();
        }
        Client client = clientService.getClientByEmail(email);

        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Integer id) {
        Client client = clientService.getClientById(id);
        return client != null ? ResponseEntity.ok(client) : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseClient> authenticateClient(@RequestBody AuthRequestClient authRequestClient) {
        boolean isAuthenticated = clientService.authenticateClient(authRequestClient.getEmail(), authRequestClient.getPassword());

        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = TokenGenerator.generateToken();

        return ResponseEntity.ok(new AuthResponseClient(true, token));
    }

    @PostMapping("/createClient")
    public ResponseEntity<Map<String, String>> createClient(@RequestBody Client client) {
        try {
            clientService.createClient(client);
            Map<String, String> response = new HashMap<>();
            response.put("message", "true");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "false");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    @GetMapping("/clientsInGym")
    public ResponseEntity<Map<String, Integer>> getClientsInGym() {
        Integer clientsInGym = clientService.getClientsInGym().size();
        
        Map<String, Integer> response = new HashMap<>();
        response.put("clientsInGym", clientsInGym);
        
        return ResponseEntity.ok(response);
    }




}