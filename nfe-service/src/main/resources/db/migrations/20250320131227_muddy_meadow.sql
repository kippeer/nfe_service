CREATE TABLE nfe (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(255) NOT NULL,
    data_emissao TIMESTAMP
);

CREATE TABLE item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    nfe_id BIGINT,
    FOREIGN KEY (nfe_id) REFERENCES nfe(id)
);