SELECT 
    e.name AS `Name`,
    e.position AS `Position`,
    e.join_date AS `Join Date`,
    IF(e.release_date IS NULL, "", e.release_date) AS `Release Date`,
    CONCAT(e.year_of_experience, " Years") AS `Year of Experience`,
    CONCAT("$", e.salary) AS `Salary`

    FROM `employees` AS e
    ORDER BY `year_of_experience` DESC
    LIMIT 3
;