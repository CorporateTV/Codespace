CREATE DATABASE lisyncDB;
USE lisyncDB;

/*------------------------------------- EMPRESA -------------------------------------*/

CREATE TABLE Empresa (
	idEmpresa 		INT PRIMARY KEY AUTO_INCREMENT,
	nomeFantasia 	VARCHAR(45),
	plano 			VARCHAR(45),
    
	CONSTRAINT CHK_Plano CHECK (plano IN('Basico', 'Corporativo', 'Enterprise'))
    /*Interprise -> Enterprise*/
);

INSERT INTO Empresa (nomeFantasia, plano) VALUES
	("SPTech", 'Corporativo'),
    ("Elera.", 'Basico');

/*------------------------------------- AMBIENTE -------------------------------------*/

CREATE TABLE Ambiente (
	idAmbiente 		INT PRIMARY KEY AUTO_INCREMENT,
	setor 			VARCHAR(45),
	andar 			VARCHAR(45),
	fkEmpresa 		INT,
    
CONSTRAINT fkEmpresaAmbiente FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

INSERT INTO ambiente (setor, andar, fkEmpresa) VALUES 
    ('Desenvolvimento', '1º Andar', 1),
    ('Marketing', '2º Andar', 1),
    ('Recursos Humanos', '3º Andar', 1),
    ('Desenvolvimento', '1º Andar', 2),
    ('Marketing', '2º Andar', 2),
    ('Recursos Humanos', '3º Andar', 2);

/*------------------------------------- USUÁRIO -------------------------------------*/

CREATE TABLE Usuario (
	idUsuario 		INT PRIMARY KEY AUTO_INCREMENT,
    /* nome -> nomeUsuario */
	nomeUsuario		VARCHAR(45),
	email 			VARCHAR(225),
	senha 			VARCHAR(45),
	fkEmpresa 		INT NOT NULL,
	fkGestor 		INT,
    
	CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
	CONSTRAINT fkGestor FOREIGN KEY (fkGestor) REFERENCES Usuario(idUsuario)
);

INSERT INTO Usuario (nomeUsuario, email, senha, fkEmpresa, fkGestor) VALUES 
	("Felipe Almeida", "felipe.almeida@sptech.school", "felipe123", 1, null),
	("Carlos Manoel", "carlos.manoel@sptech.school", "carlos123", 1, 1),
	("Marcela Lopez", "marcela.lopez@elera.io", "marcela123", 2, null),
	("José Felipe", "jose.felipe@elera.io", "jose123", 2, 1),
	("Ademiro", "admin", "admin", 1, null);
    
/*------------------------------------- TELEVISÃO -------------------------------------*/

CREATE TABLE Televisao (
	idTelevisao 	INT PRIMARY KEY AUTO_INCREMENT,
    /* nome -> nomeTelevisao */
	nomeTelevisao	VARCHAR(45), 
	taxaAtualizacao INT,
    /*hostName -> hostname*/
	hostname 		VARCHAR(80),
	fkAmbiente 		INT NOT NULL,
    
	CONSTRAINT fkAmbiente FOREIGN KEY (fkAmbiente) REFERENCES Ambiente(idAmbiente)
);

/*------------------------------------- COMPONENTE -------------------------------------*/

CREATE TABLE Componente (
	idComponente 	INT PRIMARY KEY AUTO_INCREMENT,
	modelo 			VARCHAR(225),
	identificador 	VARCHAR(225),
	tipoComponente 	VARCHAR(45),
	fkTelevisao 	INT NOT NULL,
    
	CONSTRAINT fkTv FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
);

/*------------------------------------- JANELA -------------------------------------*/

CREATE TABLE Janela (
	idJanela 		INT PRIMARY KEY AUTO_INCREMENT,
	pidJanela		VARCHAR(45),
	titulo 			VARCHAR(225),
	localizacao 	VARCHAR(225),
	visivel 		VARCHAR(45),
	fkTelevisao 	INT,
    
	CONSTRAINT fkTelevisaoJanela FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
);

/*------------------------------------- LOG PROCESSO -------------------------------------*/

CREATE TABLE LogProcesso (
	idLog 			INT PRIMARY KEY AUTO_INCREMENT,
	pid 			INT,
	dataHora 		VARCHAR(45),
    /*nome -> nomeProcesso*/
	nomeProcesso 	VARCHAR(80),
	valor 			DOUBLE,
	fkComponente 	INT NOT NULL,
    
	CONSTRAINT fkComponenteLog FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

/*------------------------------------- LOG COMPONENTE -------------------------------------*/

CREATE TABLE LogComponente (
	idLogComponente INT PRIMARY KEY AUTO_INCREMENT,
	dataHora 		VARCHAR(45),
	valor 			DOUBLE,
	fkComponente 	INT NOT NULL,
    
	CONSTRAINT fkComponenteLogComponente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);

/*------------------------------------- COMANDO -------------------------------------*/

CREATE TABLE Comando (
	idComando 		INT PRIMARY KEY AUTO_INCREMENT,
    /*nome -> nomeComando*/
	nomeComando 	VARCHAR(45),
	fkTelevisao		INT,
    
	CONSTRAINT fkTelevisaoComando FOREIGN KEY (fkTelevisao) REFERENCES Televisao(idTelevisao)
);

/*------------------------------------- SELECTS -------------------------------------*/

SELECT * FROM Janela;
SELECT * FROM LogComponente;
SELECT * FROM Componente;
SELECT * FROM Televisao;
SELECT * FROM Ambiente;
SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM comando;


/* INSERT'S */

INSERT INTO Televisao (nomeTelevisao, taxaAtualizacao, hostname, fkAmbiente) VALUES 
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
    
INSERT INTO Televisao (nomeTelevisao, taxaAtualizacao, hostname, fkAmbiente) VALUES 
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

SELECT * FROM Televisao;

-- DROP DATABASE lisyncDB;