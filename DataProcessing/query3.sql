-- Assumptions made:
-- - Salary paid not based on fixed date, but rather how many months the employee had worked (floored down)
-- - A month consists of 30 days

-- For debugging, add these to select
-- `report`.monthly_pay,
-- `report`.work_month,
-- `report`.work_month * `report`.monthly_pay

-- Use CTE instead of subquery for more intuitive way of reading the query
WITH 
    `report` AS (
        SELECT
            FLOOR(
                DATEDIFF(
                    IF(release_date IS NULL OR release_date > DATE("2021-12-31"), 
                        DATE("2022-01-01"), 
                        release_date),
                    IF(join_date > DATE("2021-01-01"),
                        IF(join_date < DATE("2021-12-31"), join_date, DATE("2021-12-31")),
                        DATE("2021-01-01"))
                ) / 365 * 12
            ) AS `work_month`,
            salary AS `monthly_pay`
        FROM `employees`)
SELECT
    SUM(`report`.work_month * `report`.monthly_pay) AS `2021_expense`
FROM `report`;