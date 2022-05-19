use harwex_afisha;
go

-- CITIES
insert into city values
    (N'Минск'),
    (N'Витебск'),
    (N'Гомель'),
    (N'Гродно'),
    (N'Могилёв'),
    (N'Брест')

-- MOVIES
insert into movie(name, description, year, slogan, country, age, director, duration) values
    ('Inception', null, 2022, N'Твой разум - место преступления', 'USA', 12, N'Кристофер Нолан', 148),
    ('Suicide Squad', null, 2021, N'Какой-то крутой слоган', 'USA', 16, N'Режиссер', 118),
    ('Warcraft', null, 2019, N'War craft', 'USA, China', 12, N'Дункан Джонсон', 110),
    ('Avengers', null, 2019, N'hulk', 'USA', 12, N'Железный человек', 98)

update movie set description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pellentesque blandit facilisis. Nulla id tincidunt urna. Suspendisse lacinia, magna sit amet sollicitudin volutpat, urna metus pretium leo, ut ultrices turpis ligula ac metus. Ut eu elit at magna sollicitudin pharetra. Pellentesque vitae turpis in sem cursus luctus. Vestibulum malesuada pellentesque enim, non gravida eros blandit non. Quisque ut velit a leo tempor pulvinar. Sed eget eleifend libero. Aenean eget gravida quam, a imperdiet ex. Duis consectetur nisi nibh, laoreet scelerisque orci dapibus eget. Donec ultricies efficitur massa, eu accumsan massa vulputate a. Proin ac augue eu ligula porttitor ultrices. Nunc purus metus, vehicula id pulvinar ut, hendrerit eu elit.'

-- CINEMAS
insert into cinema(name, about, cityId) values
    ('Cinema 1', null, 1),
    ('Cinema 2', null, 1),
    ('Cinema 3', null, 2)

-- HALLS
insert into hall(cinemaId, rows, cols, name) values
    (1, 4, 12, 'Hall 1'), (1, 3, 20, 'Hall 2'),
    (2, 7, 8, 'Big hall'), (2, 10, 11, 'Small hall'),
    (3, 5, 10, 'Hall')

-- MAP MOVIES TO CINEMAS
insert into cinemaMovie(cinemaId, movieId, start, finish) values
    (1,1, '2022-05-10', '2022-05-31'), (1,2, '2022-05-12', '2022-05-31'), (1,3, '2022-05-12', '2022-05-31'),
    (2,1, '2022-05-10', '2022-05-31'), (2,2, '2022-05-12', '2022-05-31'),
    (3,3, '2022-05-10', '2022-05-31'), (3,2, '2022-05-12', '2022-05-31')

-- SESSIONS
insert into session(cinemaMovieId, hallId, time, price, ticketsOrdered) values
    (1, 1, '2022-05-13 9:00:00', 4.99, 0),
    (1, 1, '2022-05-13 11:00:00', 4.99, 0),
    (1, 2, '2022-05-13 16:30:00', 7.99, 0),
    (1, 1, '2022-05-13 20:00:00', 11.99, 0)

-- USER ROLES
insert into userRole(name) values
    ('USER'), ('ADMIN')

-- USERS
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
