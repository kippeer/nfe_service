package br.com.empresa.nfe.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Nfe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String numero;
    private LocalDateTime dataEmissao;
    
    @OneToMany(mappedBy = "nfe", cascade = CascadeType.ALL)
    private List<Item> itens = new ArrayList<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDateTime getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDateTime dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public List<Item> getItens() {
        return itens;
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
        if (itens != null) {
            itens.forEach(item -> item.setNfe(this));
        }
    }

    public void addItem(Item item) {
        itens.add(item);
        item.setNfe(this);
    }
}