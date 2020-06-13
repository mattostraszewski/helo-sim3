select *
from posts 
join users on posts.author_id = users.id
where posts.post_id = $1