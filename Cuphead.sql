drop database cuphead;

create database cuphead;

use cuphead;

create table Usuario (
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
	senha varchar(45)
);

create table Quiz (
	idQuiz int auto_increment,
    fkUsuario int,
    numeroTentativas int,
    acertos int,
	primary key (idQuiz, fkUsuario),
    foreign key (fkUsuario) references Usuario(idUsuario)
);
select * from Quiz;

select * from Usuario;
