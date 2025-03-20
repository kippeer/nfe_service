CREATE TABLE IF NOT EXISTS nfe (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(255) NOT NULL,
    data_emissao TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    nfe_id BIGINT,
    FOREIGN KEY (nfe_id) REFERENCES nfe(id)
);