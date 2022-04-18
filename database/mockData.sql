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
    (1,1, '2000-01-01', '2000-01-10'), (1,2, '2000-01-01', '2000-01-08'), (1,3, '2000-01-01', '2000-01-04'),
    (2,1, '2000-01-01', '2000-01-09'), (2,2, '2000-01-01', '2000-01-12'),
    (3,3, '2000-01-01', '2000-01-12'), (3,2, '2000-01-01', '2000-01-06')

insert into hall(cinemaId, seatsAmount) values
    (1, 40), (1, 20),
    (2, 30), (2, 30),
    (3, 50)

insert into session(cinemaMovieId, hallId, time, price, ticketsOrdered) values
    (1, 1, '2000-01-01 9:00:00', 4.99, 0),
    (1, 1, '2000-01-01 11:00:00', 4.99, 0),
    (1, 2, '2000-01-01 16:30:00', 7.99, 0),
    (1, 1, '2000-01-01 20:00:00', 11.99, 0)

-- select * from city
-- select * from movie
-- select * from cinema
-- select * from cinemaMovie
-- select * from session
