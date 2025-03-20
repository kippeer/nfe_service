package br.com.empresa.nfe.repository;

import br.com.empresa.nfe.model.Nfe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NfeRepository extends JpaRepository<Nfe, Long> {
}