INSERT INTO nfe (numero, data_emissao) VALUES
    ('NFE123462', TIMESTAMP '2025-03-26 16:00:00'),
    ('NFE123463', TIMESTAMP '2025-03-27 11:30:00'),
    ('NFE123464', TIMESTAMP '2025-03-28 14:45:00'),
    ('NFE123465', TIMESTAMP '2025-03-29 08:00:00'),
    ('NFE123466', TIMESTAMP '2025-03-30 18:20:00');


INSERT INTO item (descricao, quantidade, valor_unitario, nfe_id) VALUES
  ('Coca-Cola 2L', 15.00, 8.50, 1),  -- Referência à NFe com id = 1
  ('Arroz Tio João 5kg', 7.50, 18.00, 1),  -- Referência à NFe com id = 1
  ('Feijão Carioca 1kg', 3.25, 5.50, 2),  -- Referência à NFe com id = 2
  ('Açúcar União 5kg', 10.00, 12.00, 2); -- Referência à NFe com id = 2
