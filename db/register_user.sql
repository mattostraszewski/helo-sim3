insert into users (username, password, profilePicture)
values ($1, $2, $3)

returning *