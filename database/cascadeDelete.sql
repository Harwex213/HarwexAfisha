use harwex_afisha;
go

create or alter trigger [Delete_UserRole]
    on dbo.userRole
    instead of delete
as
begin
    set nocount on;
    DELETE FROM [user] WHERE roleId IN (SELECT d.id FROM DELETED d);

    DELETE FROM [userRole] WHERE id IN (SELECT d.id FROM DELETED d);
end
go

create or alter trigger [Delete_User]
    on dbo.[user]
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [ticket] WHERE userId IN (SELECT d.id FROM DELETED d);

    DELETE FROM [user] WHERE id IN (SELECT d.id FROM DELETED d);
end
go

create or alter trigger [Delete_City]
    on dbo.city
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [cinema] WHERE cityId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [city] WHERE id IN (SELECT d.id FROM DELETED d)
end
go

create or alter trigger [Delete_Cinema]
    on dbo.cinema
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [cinemaMovie] WHERE cinemaId IN (SELECT d.id FROM DELETED d)
    DELETE FROM [hall] WHERE cinemaId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [cinema] WHERE id IN (SELECT d.id FROM DELETED d)
end
go

create or alter trigger [Delete_Movie]
    on dbo.movie
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [cinemaMovie] WHERE cinemaId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [movie] WHERE id IN (SELECT d.id FROM DELETED d)
end
go


create or alter trigger [Delete_CinemaMovie]
    on dbo.cinemaMovie
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [session] WHERE cinemaMovieId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [cinemaMovie] WHERE id IN (SELECT d.id FROM DELETED d)
end
go

create or alter trigger [Delete_Hall]
    on dbo.hall
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [session] WHERE hallId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [hall] WHERE id IN (SELECT d.id FROM DELETED d)
end
go

create or alter trigger [Delete_Session]
    on dbo.session
    instead of delete
    as
begin
    set nocount on;
    DELETE FROM [ticket] WHERE sessionId IN (SELECT d.id FROM DELETED d)

    DELETE FROM [session] WHERE id IN (SELECT d.id FROM DELETED d)
end
go
