INSERT INTO users (name_first, name_last, email)
VALUES ($1, $2, $3)
RETURNING *;
