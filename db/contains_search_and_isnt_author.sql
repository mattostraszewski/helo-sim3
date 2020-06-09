select * from posts p
where author_id != $1 and p.title like '%' || $2 || '%';