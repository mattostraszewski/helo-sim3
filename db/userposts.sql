select *
from posts 
join users on posts.author_id = users.id
where author_id = $1