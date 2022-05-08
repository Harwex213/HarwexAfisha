-- drop database harwex_afisha
-- create database harwex_afisha;

use harwex_afisha;
go

drop table if exists [ticket];
drop table if exists [session];
drop table if exists [hall];
drop table if exists [cinemaMovie];
drop table if exists [cinema];
drop table if exists [city];
drop table if exists [movie];
drop table if exists [user];
drop table if exists [userRole];

create table [userRole]
(
    id bigint constraint userRole_pk primary key identity,
    name nvarchar(50) constraint userRole_name_unique unique not null
);

create table [user]
(
    id bigint constraint user_pk primary key identity,
    username nvarchar(50) constraint user_username_unique unique not null,
    password nvarchar(max) not null,
    firstName nvarchar(50) not null,
    lastName nvarchar(50) not null,
    patronymic nvarchar(50),
    roleId bigint not null constraint user_userRole_fk foreign key references [userRole] (id),
);

create table [movie]
(
    id bigint constraint movie_pk primary key identity,
    name nvarchar(50) unique not null,
    description nvarchar(max),
);

create table [city]
(
    id bigint constraint city_pk primary key identity,
    name nvarchar(50) constraint city_name_unique unique not null,
);

create table [cinema]
(
    id bigint constraint cinema_pk primary key identity,
    name nvarchar(50) not null,
    about nvarchar(max),
    cityId bigint not null constraint cinema_city_fk foreign key references [city] (id)
);

create table [cinemaMovie]
(
    id bigint constraint cinemaMovie_pk primary key identity,
    movieId bigint not null constraint cinemaMovie_movie_fk foreign key references [movie] (id),
    cinemaId bigint not null constraint cinemaMovie_cinema_fk foreign key references [cinema] (id),
    start date not null,
    finish date not null,
    constraint cinemaMovie_unique unique (movieId, cinemaId)
);

create table [hall]
(
    id bigint constraint hall_pk primary key identity,
    name nvarchar(50) not null,
    cinemaId bigint not null constraint hall_cinema_fk foreign key references [cinema] (id),
    rows int not null check (rows >= 1),
    cols int not null check (cols >= 3),
);

create table [session]
(
    id bigint constraint session_pk primary key identity,
    cinemaMovieId bigint not null constraint session_cinemaMovie_fk foreign key references [cinemaMovie] (id),
    hallId bigint not null constraint session_hall_fk foreign key references [hall] (id),
    time datetime not null,
    price smallmoney not null,
    ticketsOrdered int not null,
);

create table [ticket]
(
    id bigint constraint ticket_pk primary key identity,
    sessionId bigint not null constraint ticket_session_fk foreign key references [session] (id),
    userId bigint not null constraint ticket_user_fk foreign key references [user] (id),
    row int not null,
    position int not null,
    constraint ticket_unique unique (sessionId, row, position)
);


-- drop index if exists sessions_by_time_movie on [session]
-- go
--
-- create nonclustered index sessions_by_time_movie on [session] (time, cinemaMovieId)
--
-- create nonclustered index cinema_city on [cinema] (cityId)
