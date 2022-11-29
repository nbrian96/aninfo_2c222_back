create database if not exists psa_aninfo;

use psa_aninfo;

create table tickets (
    id int (11) not null auto_increment,
    name varchar(100) not null,
    descripcion varchar(200) not null,
    fechaDeEmision date not null,
    fechaDeResolucion date default null,
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

insert into tickets values (1,'Ticket 1', 'ticket de prueba','2022-11-27', null), (2,'Ticket 2', 'ticket de prueba','2022-11-27', null);

describe tickets;