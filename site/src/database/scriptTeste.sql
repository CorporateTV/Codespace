	CREATE DATABASE lisyncDB;
	USE lisyncDB;


CREATE TABLE Empresa (
		idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
		nomeFantasia VARCHAR(45),
		plano VARCHAR(45),
		CONSTRAINT CHK_Plano CHECK (plano IN('Basico', 'Corporativo', 'Enterprise'))
);

INSERT INTO Empresa (nomeFantasia, plano) VALUES ("SP Tech", 'Enterprise'), ("Elera.", 'Basico');

CREATE TABLE ambiente (
	idAmbiente INT PRIMARY KEY AUTO_INCREMENT,
	setor VARCHAR(45),
	andar varchar(45),
	fkEmpresa INT,
	CONSTRAINT fkEmpresaAmbiente FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

INSERT INTO ambiente (setor, andar, fkEmpresa) VALUES 
    ('Desenvolvimento', '1º Andar', 1),
    ('Marketing', '2º Andar', 1),
    ('Recursos Humanos', '3º Andar', 1),
    ('Desenvolvimento', '1º Andar', 2),
    ('Marketing', '2º Andar', 2),
    ('Recursos Humanos', '3º Andar', 2);

SELECT * FROM Ambiente;
SELECT * from Ambiente where fkEmpresa = 1;

	CREATE TABLE Usuario (
		idUsuario INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(45),
		email VARCHAR(225),
		senha VARCHAR(45),
		fkEmpresa INT NOT NULL,
		fkGestor INT ,
		CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
		CONSTRAINT fkGestor FOREIGN KEY (fkGestor) REFERENCES Usuario(idUsuario)
	);
	INSERT INTO Usuario (nome, email, senha, fkEmpresa, fkGestor) VALUES 
		("Felipe Almeida", "felipe.almeida@sptech.school", "felipe123", 1, null),
		("Carlos Manoel", "carlos.manoel@sptech.school", "carlos123", 1, 1),
		("Marcela Lopez", "marcela.lopez@elera.io", "marcela123", 2, null),
		("José Felipe", "jose.felipe@elera.io", "jose123", 2, 1),
		("Ademiro", "admin", "admin", 1, null);


	INSERT INTO Usuario(nome, email, senha, fkEmpresa, fkGestor) VALUES 
		("Lucas Saito", "lucas.saito@elera.io", "saito123", 2, 2);
        
        	INSERT INTO Usuario(nome, email, senha, fkEmpresa, fkGestor) VALUES 
		("Rodrigo Guedes", "rodrigo.guedes@elera.io", "rodrigo123", 2, 2);

	CREATE TABLE Televisao (
		idTelevisao INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(45), 
		taxaAtualizacao INT,
		hostName VARCHAR(80),
		fkAmbiente INT NOT NULL,
		CONSTRAINT fkAmbiente FOREIGN KEY (fkAmbiente) REFERENCES ambiente(idAmbiente)
	);
    
INSERT INTO Televisao (nome, taxaAtualizacao, hostName, fkAmbiente) VALUES 
    ('Televisao 1', 60, 'SPTech_TV1', 1),
    ('Televisao 2', 60, 'SPTech_TV2', 1),
    ('Televisao 3', 60, 'SPTech_TV3', 1),
    ('Televisao 4', 60, 'SPTech_TV4', 1),
    ('Televisao 5', 60, 'SPTech_TV5', 1),
    ('Televisao 6', 60, 'SPTech_TV6', 2),
    ('Televisao 7', 60, 'SPTech_TV7', 2),
    ('Televisao 8', 60, 'SPTech_TV8', 2),
    ('Televisao 9', 60, 'SPTech_TV9', 2),
    ('Televisao 10', 60, 'SPTech_TV10', 2),
    ('Televisao 11', 60, 'SPTech_TV11', 3),
    ('Televisao 12', 60, 'SPTech_TV12', 3),
    ('Televisao 13', 60, 'SPTech_TV13', 3),
    ('Televisao 14', 60, 'SPTech_TV14', 3),
    ('Televisao 15', 60, 'SPTech_TV15', 3),
    ('Televisao 16', 60, 'SPTech_TV16', 1),
    ('Televisao 17', 60, 'SPTech_TV17', 2),
    ('Televisao 18', 60, 'SPTech_TV18', 3),
    ('Televisao 19', 60, 'SPTech_TV19', 1),
    ('Televisao 21', 80, 'SPTech_TV21', 2),
    ('Televisao 22', 60, 'SPTech_TV22', 2),
    ('Televisao 23', 60, 'SPTech_TV23', 2),
    ('Televisao 24', 60, 'SPTech_TV24', 2),
    ('Televisao 25', 60, 'SPTech_TV25', 2);
    
INSERT INTO Televisao (nome, taxaAtualizacao, hostName, fkAmbiente) VALUES 
    ('Televisao 1', 60, 'Elera_TV1', 4),
    ('Televisao 2', 60, 'Elera_TV2', 4),
    ('Televisao 3', 60, 'Elera_TV3', 4),
    ('Televisao 4', 60, 'Elera_TV4', 4),
    ('Televisao 5', 60, 'Elera_TV5', 4),
    ('Televisao 6', 60, 'Elera_TV6', 5),
    ('Televisao 7', 60, 'Elera_TV7', 5),
    ('Televisao 8', 60, 'Elera_TV8', 5),
    ('Televisao 9', 60, 'Elera_TV9', 5),
    ('Televisao 10', 60, 'Elera_TV10', 5),
    ('Televisao 11', 60, 'Elera_TV11', 6),
    ('Televisao 12', 60, 'Elera_TV12', 6),
    ('Televisao 13', 60, 'Elera_TV13', 6),
    ('Televisao 14', 60, 'Elera_TV14', 6),
    ('Televisao 15', 60, 'Elera_TV15', 6),
    ('Televisao 16', 60, 'Elera_TV16', 4),
    ('Televisao 17', 60, 'Elera_TV17', 5),
    ('Televisao 18', 60, 'Elera_TV18', 6),
    ('Televisao 19', 60, 'Elera_TV19', 4),
    ('Televisao 20', 60, 'Elera_TV20', 5);

	CREATE TABLE Componente (
		idComponente INT PRIMARY KEY AUTO_INCREMENT,
		modelo VARCHAR(225),
		identificador VARCHAR(225),
		tipoComponente VARCHAR(45),
		fkTelevisao INT NOT NULL,
		CONSTRAINT fkTv FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
	);

	CREATE TABLE Janela (
		idJanela INT PRIMARY KEY AUTO_INCREMENT,
		pidJanela VARCHAR(45),
		titulo VARCHAR(225),
		localizacao VARCHAR(225),
		visivel VARCHAR(45),
		fkTelevisao INT,
		CONSTRAINT fkTelevisaoJanela FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
	);

	CREATE TABLE Log (
		idLog INT PRIMARY KEY AUTO_INCREMENT,
		pid INT,
		dataHora VARCHAR(45),
		nomeProcesso VARCHAR(80),
		valor DOUBLE,
		fkComponente INT NOT NULL,
		CONSTRAINT fkComponenteLog FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
	);

	CREATE TABLE LogComponente (
		idLogComponente INT PRIMARY KEY AUTO_INCREMENT,
		dataHora VARCHAR(45),
		valor DOUBLE,
		fkComponente INT NOT NULL,
		CONSTRAINT fkComponenteLogComponente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
	);

	CREATE TABLE comando (
		idComando INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(45),
		fkTelevisao INT,
		CONSTRAINT fkTelevisaoComando FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
	);

	CREATE TABLE Alertas (
		idAlertas INT PRIMARY KEY AUTO_INCREMENT,
		valor DOUBLE,
		datahora VARCHAR(45),
		fkTelevisao INT,
		CONSTRAINT fkTelevisaoAlertas FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
	);

SELECT * FROM Ambiente;
SELECT * FROM Televisao;
SELECT * FROM Usuario;

-- Função quantidade TV por empresa
SELECT COUNT(*) AS quantidade FROM Televisao JOIN Ambiente ON fkAmbiente = IdAmbiente JOIN Empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = 1;

-- Função quantidade Usuários por empresa
SELECT COUNT(*) AS quantidadeUsuarios FROM Usuario JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = 1;

-- Função quantidade Usuários por tipo
SELECT SUM(CASE WHEN fkGestor IS NULL THEN 1 ELSE 0 END) AS assitenteNoc, SUM(CASE WHEN fkGestor IS NOT NULL THEN 1 ELSE 0 END) 
    AS gestorNoc FROM Usuario WHERE fkEmpresa = 1;

INSERT INTO Usuario (nome, email, senha, fkEmpresa, fkGestor) VALUES 
		("Matheus Shoji", "matheus.shoji@sptech.school", "shoji123", 1, null),
        ("Gabriel Shoji", "gabriel.shoji@sptech.school", "takeshi123", 1, 4);
        
-- Função listar todos os dados Tv
SELECT * FROM Televisao as televisao JOIN Ambiente as ambiente ON fkAmbiente = IdAmbiente JOIN Empresa as empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = 1;

-- Função listar todos os dados Componente
SELECT modelo as modelo, identificador as identificador, tipoComponente as tipoComponente FROM Componente as componente JOIN Televisao as televisao ON fkTelevisao = idTelevisao WHERE idTelevisao = 45;
        
UPDATE Usuario set nome = "Felipe Almeida", email = "felipe.almeida@sptech.school" WHERE idUsuario = 1;

SELECT SUM(CASE WHEN fkGestor IS NULL THEN 1 ELSE 0 END) AS gestorNoc, SUM(CASE WHEN fkGestor IS NOT NULL THEN 1 ELSE 0 END) 
    AS assitenteNoc FROM Usuario WHERE fkEmpresa = 1;
    
SELECT * FROM Usuario WHERE fkEmpresa = 1;

SELECT * FROM Comando WHERE fkTelevisao = 1;
SELECT * FROM Comando;

INSERT INTO Comando (nome, fkTelevisao) VALUES 
	("ipconfig", 1);
    
UPDATE Comando SET nome = "top" WHERE idComando = 1;
DELETE FROM Comando WHERE idComando = 1; 

SELECT MAX(idComando) FROM Comando;

-- Inserir os componentes para cada televisão
INSERT INTO Componente (modelo, identificador, tipoComponente, fkTelevisao) VALUES 
    ('Modelo X1 TV 1', 'ID_CPU_1', 'CPU', 1),
    ('Modelo X2 TV 1', 'ID_Disco_1', 'Disco', 1),
    ('Modelo X3 TV 1', 'ID_RAM_1', 'RAM', 1),
    ('Modelo X1 TV 2', 'ID_CPU_2', 'CPU', 2),
    ('Modelo X2 TV 2', 'ID_Disco_2', 'Disco', 2),
    ('Modelo X3 TV 2', 'ID_RAM_2', 'RAM', 2),
    ('Modelo X1 TV 3', 'ID_CPU_3', 'CPU', 3),
    ('Modelo X2 TV 3', 'ID_Disco_3', 'Disco', 3),
    ('Modelo X3 TV 3', 'ID_RAM_3', 'RAM', 3),
    ('Modelo X1', 'ID_CPU_4', 'CPU', 4),
    ('Modelo X2', 'ID_Disco_4', 'Disco', 4),
    ('Modelo X3', 'ID_RAM_4', 'RAM', 4),
    ('Modelo X1', 'ID_CPU_5', 'CPU', 5),
    ('Modelo X2', 'ID_Disco_5', 'Disco', 5),
    ('Modelo X3', 'ID_RAM_5', 'RAM', 5);

-- Novamente, assumindo que os ids dos componentes são gerados automaticamente e que podemos obtê-los de alguma maneira.

-- Supomos que os ids gerados para os componentes são 1 a 15, três para cada televisão.

-- Inserir os registros de log para cada componente
-- Televisão 1
INSERT INTO LogComponente (dataHora, valor, fkComponente) VALUES 
    ('2024-06-02 10:00:00', 45.5, 4),
    ('2024-06-02 11:00:00', 50.0, 4),
    ('2024-06-02 12:00:00', 47.5, 4),
    ('2024-06-02 10:00:00', 500.0, 5),
    ('2024-06-02 11:00:00', 480.0, 5),
    ('2024-06-02 12:00:00', 490.0, 5),
    ('2024-06-02 10:00:00', 4.0, 6),
    ('2024-06-02 11:00:00', 4.5, 6),
    ('2024-06-02 12:00:00', 4.3, 6),
-- Televisão 2
    ('2024-06-02 10:00:00', 46.5, 7),
    ('2024-06-02 11:00:00', 51.0, 7),
    ('2024-06-02 12:00:00', 48.5, 7),
    ('2024-06-02 10:00:00', 510.0, 8),
    ('2024-06-02 11:00:00', 490.0, 8),
    ('2024-06-02 12:00:00', 500.0, 8),
    ('2024-06-02 10:00:00', 4.1, 9),
    ('2024-06-02 11:00:00', 4.6, 9),
    ('2024-06-02 12:00:00', 4.4, 9),
-- Televisão 3
    ('2024-06-02 10:00:00', 47.5, 10),
    ('2024-06-02 11:00:00', 52.0, 10),
    ('2024-06-02 12:00:00', 49.5, 10),
    ('2024-06-02 10:00:00', 520.0, 11),
    ('2024-06-02 11:00:00', 500.0, 11),
    ('2024-06-02 12:00:00', 510.0, 11),
    ('2024-06-02 10:00:00', 4.2, 12),
    ('2024-06-02 11:00:00', 4.7, 12),
    ('2024-06-02 12:00:00', 4.5, 12),
-- Televisão 4
    ('2024-06-02 10:00:00', 48.5, 13),
    ('2024-06-02 11:00:00', 53.0, 13),
    ('2024-06-02 12:00:00', 50.5, 13),
    ('2024-06-02 10:00:00', 530.0, 14),
    ('2024-06-02 11:00:00', 510.0, 14),
    ('2024-06-02 12:00:00', 520.0, 14),
    ('2024-06-02 10:00:00', 4.3, 15),
    ('2024-06-02 11:00:00', 4.8, 15),
    ('2024-06-02 12:00:00', 4.6, 15),
-- Televisão 5
    ('2024-06-02 10:00:00', 49.5, 16),
    ('2024-06-02 11:00:00', 54.0, 16),
    ('2024-06-02 12:00:00', 51.5, 16),
    ('2024-06-02 10:00:00', 540.0, 17),
    ('2024-06-02 11:00:00', 520.0, 17),
    ('2024-06-02 12:00:00', 530.0, 17),
    ('2024-06-02 10:00:00', 4.4, 18),
    ('2024-06-02 11:00:00', 4.9, 18),
    ('2024-06-02 12:00:00', 4.7, 18);

SELECT date_format(dataHora,'%H:%i:%s') as dataRegistro, valor as usoComponente, fkTelevisao as idTelevisao 
FROM LogComponente JOIN Componente ON fkComponente = idComponente JOIN Televisao ON fkTelevisao = idTelevisao 
JOIN Ambiente ON fkAmbiente = idAmbiente WHERE idAmbiente = 1 order by idLogComponente;

SELECT date_format(dataHora,'%H:%i:%s') as dataRegistro, valor as usoComponente,
        fkComponente as idComponente, comp.tipoComponente, tv.nome as nomeTv FROM
        LogComponente JOIN Componente as comp ON fkComponente = idComponente
        JOIN Televisao as tv ON fkTelevisao = idTelevisao
        WHERE idTelevisao = 1 AND tipoComponente = 'CPU'
        order by idLogComponente desc limit 1;

SELECT * FROM Televisao as televisao JOIN Ambiente as ambiente ON fkAmbiente = IdAmbiente 
    JOIN Empresa as empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = 1;


SELECT * FROM componente;
-- DROP DATABASE lisyncDB;