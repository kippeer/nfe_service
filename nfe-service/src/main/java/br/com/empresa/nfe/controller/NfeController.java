package br.com.empresa.nfe.controller;

import br.com.empresa.nfe.model.Nfe;
import br.com.empresa.nfe.service.NfeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nfe")
public class NfeController {
    
    @Autowired
    private NfeService nfeService;
    
    @PostMapping
    public ResponseEntity<Nfe> emitirNfe(@RequestBody Nfe nfe) {
        return ResponseEntity.ok(nfeService.emitirNfe(nfe));
    }

    @GetMapping
    public ResponseEntity<List<Nfe>> listarTodas() {
        return ResponseEntity.ok(nfeService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nfe> buscarPorId(@PathVariable Long id) {
        return nfeService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarNfe(@PathVariable Long id) {
        nfeService.cancelarNfe(id);
        return ResponseEntity.noContent().build();
    }
}