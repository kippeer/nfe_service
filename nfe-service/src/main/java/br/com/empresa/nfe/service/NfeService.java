package br.com.empresa.nfe.service;

import br.com.empresa.nfe.model.Nfe;
import br.com.empresa.nfe.repository.NfeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NfeService {
    
    @Autowired
    private NfeRepository nfeRepository;
    
    @Transactional
    public Nfe emitirNfe(Nfe nfe) {
        if (nfe.getDataEmissao() == null) {
            nfe.setDataEmissao(LocalDateTime.now());
        }
        
        // Gerar número da NFe (em produção, isso seria mais complexo)
        if (nfe.getNumero() == null || nfe.getNumero().trim().isEmpty()) {
            nfe.setNumero(String.format("NFE%d", System.currentTimeMillis()));
        }
        
        return nfeRepository.save(nfe);
    }

    public List<Nfe> listarTodas() {
        return nfeRepository.findAll();
    }

    public Optional<Nfe> buscarPorId(Long id) {
        return nfeRepository.findById(id);
    }

    @Transactional
    public void cancelarNfe(Long id) {
        // Em produção, implementaria a lógica de cancelamento junto à SEFAZ
        nfeRepository.deleteById(id);
    }
}