SELECT 
    e.name AS `Name`,
    e.position AS `Position`,
    e.join_date AS `Join Date`,
    IF(e.release_date IS NULL, "", e.release_date) AS `Release Date`,
    CONCAT(e.year_of_experience, " Years") AS `Year of Experience`,
    CONCAT("$", e.salary) AS `Salary`

    FROM (
        SELECT 
            * 
        FROM `employees` 
        WHERE (
            employees.position = "engineer" 
            AND employees.year_of_experience <= 3
        )
    ) AS e
;