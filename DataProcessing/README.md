# Data Processing

This directory shows common problems that could be solved with SQL.

> This solution was written and tested on a machine with MariaDB installed. Using the scripts on MySQL should be fine since no advanced and DBMS-exclusive features were used.

## Setup

> Ensure your machine has `MySQL` or `MariaDB` installed

Follow these steps to try the scripts on your own machine:

1. Open MySQL/MariaDB console.

    ```
    mysql -u <user> -p
    ```

2. If this is your first time following or want to reset the database to its initial state, copy paste the content of `seed.sql` and run it. Another way to do it is to run the following:
    ```
    source /path/to/seed.sql
    ```

3. Choose the DB you ran the 2<sup>nd</sup> step with (already done if `seed.sql` was executed). For each of the query scripts, you could run them the same way as the 2<sup>nd</sup> query: copy-paste then run or run the following:

    ```
    source /path/to/query.sql
    ```

## Thoughts

### Query 1: Data Insertion

This query is for inserting new data. It's pretty straightforward as you only have to comply with the table's field.
  
### Query 2: Data Update

This query is for updating data with certain criterion. Again, straightforward as you only need to supply the right conditionals and the appropiate new values.
  
### Query 3: Aggregation

This query shows how you could obtain insight from your table, for example for obtaining the money expended on certain time of year. In this case, `SUM` aggregates the monthly expense data. You could combine which data to obtain before aggregating them by implementing them with `SELECT` conditionals or other built-in functions.

As this might be the most complex (as in straightforward-ness) example among all queries, so let's break it down. Our task was to calculate the total money expensed in 2021 to pay the employee's salary. Here are the steps I used to approach it:

> NOTE: Here are the assumptions being considered for this query:
> 
> 1. The salary would be paid for every 30 days the employee had worked. This implies that employee would have different payday based on their join date and when they had worked, say 4.3 months, they still considered worked 4 months from salary payment point of view.
> 
> 2. The data in salary column is the monthly salary

1. We should truncate the `release_date` to be within the range of date in 2021. If the employee hasn't quitted until 2021 ends, set `date1` as the last day of 2021.

```sql
    IF(release_date IS NULL OR release_date > DATE("2021-12-31"), 
        DATE("2022-01-01"), 
        release_date),
```

2. We should also truncate the `join_date` to be within the range of date in 2021. If the employee already joined before 2021, set `date2` as the first day of 2021.
  
```sql
    IF(join_date < DATE("2021-01-01"),
        DATE("2021-01-01"),
        join_date)
```

3. We calculate how many months they had worked in 2021 (with 1 month = 30 days). By logic, we wouldn't pay those who haven't joined since the last day of 2021 and who already left before the first day of 2021. So, during calculation, we add a special multiplier to adjust the months the employee had been working. As per our assumption, we also should round down the number of working month, if it's a fraction.

```sql
    FLOOR(
        DATEDIFF(
            -- < code snippet from step (1)>
            -- < code snippet from step (2)>
        ) / 30 * IF(join_date > DATE("2021-12-31") OR release_date < DATE("2021-01-01"), 0, 1)
    ) AS `work_month`,
```

4. We use `SUM` to aggregate the result

```sql 
    SUM(`report`.work_month * `report`.monthly_pay) AS `2021_expense`
```



### Query 4: Sorting and Pagination

This query shows how sorting and limiting the number of data you obtained. This could be nice for paginated view scenario where the client has to gradually request for new data when needed, instead of loading them all at once. Pagination often paired with a `OFFSET` parameter, which decide from which data you would start the selection.

### Query 5: Subqueries

This query demonstrates a way to utilize subqueries. When using it, you could say that we are running a query within a query. In this query, we are using the main query for formatting the data and the subquery for filtering. This, however, has to be used with caution as it may increase the selection time.