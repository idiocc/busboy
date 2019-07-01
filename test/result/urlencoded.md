## Unassigned value
foo

/* expected */
[["foo","",false,false]]
/**/

## Assigned value
foo=bar

/* expected */
[["foo","bar",false,false]]
/**/

## Unassigned and assigned value
foo&bar=baz

/* expected */
[["foo","",false,false],["bar","baz",false,false]]
/**/

## Assigned and unassigned value
foo=bar&baz

/* expected */
[["foo","bar",false,false],["baz","",false,false]]
/**/

## Two assigned values
foo=bar&baz=bla

/* expected */
[["foo","bar",false,false],["baz","bla",false,false]]
/**/

## Two unassigned values
foo&bar

/* expected */
[["foo","",false,false],["bar","",false,false]]
/**/

## Two unassigned values and ampersand
foo&bar&

/* expected */
[["foo","",false,false],["bar","",false,false]]
/**/

## Assigned value with (plus) space
foo=bar+baz%2Bquux

/* expected */
[["foo","bar baz+quux",false,false]]
/**/

## Assigned value with encoded bytes
foo=bar%20baz%21

/* expected */
[["foo","bar baz!",false,false]]
/**/

## Assigned value with encoded bytes #2
foo%20bar=baz%20bla%21

/* expected */
[["foo bar","baz bla!",false,false]]
/**/

## Two assigned values, one with encoded bytes
foo=bar%20baz%21&num=1000

/* expected */
[["foo","bar baz!",false,false],["num","1000",false,false]]
/**/

## Limits: zero fields
foo=bar&baz=bla

/* limits */
{
  "fields": 0
}
/**/


/* expected */
[]
/**/

## Limits: one field
foo=bar&baz=bla

/* limits */
{
  "fields": 1
}
/**/


/* expected */
[["foo","bar",false,false]]
/**/

## Limits: field part lengths match limits
foo=bar&baz=bla

/* limits */
{
  "fieldNameSize": 3,
  "fieldSize": 3
}
/**/


/* expected */
[["foo","bar",false,false],["baz","bla",false,false]]
/**/

## Limits: truncated field name
foo=bar&baz=bla

/* limits */
{
  "fieldNameSize": 2
}
/**/


/* expected */
[["fo","bar",true,false],["ba","bla",true,false]]
/**/

## Limits: truncated field value
foo=bar&baz=bla

/* limits */
{
  "fieldSize": 2
}
/**/


/* expected */
[["foo","ba",false,true],["baz","bl",false,true]]
/**/

## Limits: truncated field name and value
foo=bar&baz=bla

/* limits */
{
  "fieldNameSize": 2,
  "fieldSize": 2
}
/**/


/* expected */
[["fo","ba",true,true],["ba","bl",true,true]]
/**/

## Limits: truncated field name and zero value limit
foo=bar&baz=bla

/* limits */
{
  "fieldNameSize": 2,
  "fieldSize": 0
}
/**/


/* expected */
[["fo","",true,true],["ba","",true,true]]
/**/

## Limits: truncated zero field name and zero value limit
foo=bar&baz=bla

/* limits */
{
  "fieldNameSize": 0,
  "fieldSize": 0
}
/**/


/* expected */
[["","",true,true],["","",true,true]]
/**/

## Ampersand
&

/* expected */
[]
/**/

## Many ampersands
&&&&&

/* expected */
[]
/**/

## Assigned value, empty name and value
=

/* expected */
[["","",false,false]]
/**/

## Nothing


/* expected */
[]
/**/