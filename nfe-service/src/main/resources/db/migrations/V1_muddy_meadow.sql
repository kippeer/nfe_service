CREATE TABLE nfe (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_emissao DATE,
    numero VARCHAR(255)
);

CREATE TABLE item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    nfe_id BIGINT,
    FOREIGN KEY (nfe_id) REFERENCES nfe(id)
);



INSERT INTO nfe (numero, data_emissao) VALUES
('NFE001', '2024-03-20 10:30:00'),
('NFE002', '2024-03-20 14:45:00'),
('NFE003', '2024-03-21 09:15:00'),
('NFE004', '2024-03-21 16:20:00'),
('NFE005', '2024-03-22 11:00:00');

-- Inserção de Itens para NFE001
INSERT INTO item (descricao, quantidade, valor_unitario, nfe_id) VALUES
('Notebook Dell XPS 13', 1, 8999.99, 1),
('Mouse sem fio Logitech', 2, 199.99, 1),
('Teclado Mecânico', 1, 499.99, 1);

-- Inserção de Itens para NFE002
INSERT INTO item (descricao, quantidade, valor_unitario, nfe_id) VALUES
('Monitor 27" 4K', 2, 2499.99, 2),
('Webcam HD', 3, 299.99, 2),
('Headset Gamer', 1, 399.99, 2);

