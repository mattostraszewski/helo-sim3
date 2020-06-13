insert into users (username, password, profilepicture)
values ($1, $2, $3);

returning *