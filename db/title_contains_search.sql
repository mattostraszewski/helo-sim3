select *
from posts p
join users on p.author_id = users.id
where p.title like '%' || $1 || '%' and author_id = $2


-- author_id = $1 and 