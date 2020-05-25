# Natours API

The API for Natours allows users to query for different results by setting the **query string** in the url.

## Filtering by fields

You can filter results by fields using the following format in the query string:

> ?**field_name**=**value**

For example:
`?difficulty=medium`

You can also chain filters using '**&**'.

For example:
`?difficulty=medium&duration=5`

## Comparisons

You can also filter using comparison operators such as `>, >=, <, <=`.

| Operator            | Filter               |
| ------------------- | -------------------- |
| <center>></center>  | <center>gt</center>  |
| <center>>=</center> | <center>gte</center> |
| <center><</center>  | <center>lt</center>  |
| <center><=</center> | <center>lte</center> |

**Format:**

> ?**field_name**[**filter**]=**value**</center>

The following query returns results with duration **>=** 7.
`?duration[gte]=7`

## Sorting

You can sort results by setting the **sort** property to the corresponding field in the query string.

> ?**sort**=**field_name**

For example:
`?sort=price`

The above query sorts the results by price in the **ascending order**.

To return results in the **descending order**, just add a **minus** (**-**) in front of the field name.

For example:
`?sort=-price`

### Chaining fields

If you want to sort by multiple fields, you can chain them with a **comma** ( **,** ). Fields are prioritized in the order in which they appear. Additional field names are used only when there is a tie between two results.

For example:
`?sort=-price,ratings`

## Limiting fields (or Projecting)

When querying for results, it is important for users to select only the fields they require to save bandwidth.

You can either **include** or **exclude** a field in the results.

To include or exclude fields, you set the **field names** as the value for the **fields** property. To project multiple fields, chain them using the **comma** (**,**).

### Including fields

Format:

> ?**fields**=**field_name**

For example:
`?fields=name,images`

### Excluding fields

To exclude fields, attach a **minus** (**-**) in front of the field name.

For example:
`?fields=-email`

## Limiting the amount of results (or Pagination)

You can limit the amount of results by setting the **page** and **limit** fields in the query string. The values of the fields must be **integers**.

| Field                  | Type                     | Usage                                                | Default value       |
| ---------------------- | ------------------------ | ---------------------------------------------------- | ------------------- |
| <center>page</center>  | <center>integer</center> | <center>Sets the page number</center>                | <center>1</center>  |
| <center>limit</center> | <center>integer</center> | <center>Sets the number of results per page</center> | <center>10</center> |

**Format:**

> ?**page**=value&&**limit**=value

For example:
`?page=2&limit=10`

The above query returns returns results 11-20.
