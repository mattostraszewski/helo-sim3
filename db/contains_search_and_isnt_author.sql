select * from posts p
join users on p.author_id = users.id
where  p.title like '%' || $1 || '%';