use harwex_afisha;
go

insert into city values
    ('Vitebsk'),
    ('Minshk')

insert into movie(name, description) values
    ('Inception', null),
    ('Suicide Squad', null),
    ('Warcraft', null),
    ('Avengers', null)

insert into cinema(name, about, cityId) values
    ('Cinema 1', null, 1),
    ('Cinema 2', null, 1),
    ('Cinema 3', null, 2)

insert into cinemaMovie(cinemaId, movieId, start, finish) values
    (1,1, '2022-01-01', '2022-06-01'), (1,2, '2022-01-01', '2022-01-08'), (1,3, '2022-01-01', '2022-01-04'),
    (2,1, '2022-01-01', '2022-01-09'), (2,2, '2022-01-01', '2022-01-12'),
    (3,3, '2022-01-01', '2022-01-12'), (3,2, '2022-01-01', '2022-01-06')

insert into hall(cinemaId, rows, cols, name) values
    (1, 4, 12, 'Hall 1'), (1, 3, 20, 'Hall 2'),
    (2, 7, 8, 'Big hall'), (2, 10, 11, 'Small hall'),
    (3, 5, 10, 'Hall')

insert into session(cinemaMovieId, hallId, time, price, ticketsOrdered) values
    (1, 1, '2022-05-11 9:00:00', 4.99, 0),
    (1, 1, '2022-05-11 11:00:00', 4.99, 0),
    (1, 2, '2022-05-11 16:30:00', 7.99, 0),
    (1, 1, '2022-05-11 20:00:00', 11.99, 0)

insert into userRole(name) values
    ('USER'), ('ADMIN')

insert into [user](username, password, firstName, lastName, patronymic, roleId) values
    ('aleg', '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c', 'aleg', 'aleg', null, 1),
    ('harwex', '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c', 'aleg', 'aleg', null, 2)

-- select * from city
-- select * from movie
-- select * from cinema
-- select * from cinemaMovie where cinemaId = 1
-- select * from session
-- select * from [user]
-- select * from [userRole]

-- select id [movieId] from movie except select movieId from cinemaMovie where cinemaId = 1
