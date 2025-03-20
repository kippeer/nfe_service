package br.com.empresa.nfe.config;

import br.com.empresa.nfe.model.Item;
import br.com.empresa.nfe.model.Nfe;
import br.com.empresa.nfe.repository.NfeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private NfeRepository nfeRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar uma NFe de exemplo
        Nfe nfe = new Nfe();
        nfe.setNumero("NFE00001");
        nfe.setDataEmissao(LocalDateTime.now());

        Item item1 = new Item();
        item1.setDescricao("Produto 1");
        item1.setQuantidade(new BigDecimal("2"));
        item1.setValorUnitario(new BigDecimal("100.00"));
        
        Item item2 = new Item();
        item2.setDescricao("Produto 2");
        item2.setQuantidade(new BigDecimal("1"));
        item2.setValorUnitario(new BigDecimal("50.00"));

        nfe.addItem(item1);
        nfe.addItem(item2);

        nfeRepository.save(nfe);
    }
}