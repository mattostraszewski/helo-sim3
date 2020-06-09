create table posts (
authorId int,
foreign key (authorId) references users(id),
id serial primary key,
title text);  