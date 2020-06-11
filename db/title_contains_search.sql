select *
from posts p
where p.title like '%' || $1 || '%';


-- author_id = $1 and 