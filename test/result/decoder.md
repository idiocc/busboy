## No encoded bytes
Hello world

/* expected */
Hello world
/**/

## One full encoded byte
Hello%20world

/* expected */
Hello world
/**/

## Two full encoded bytes
Hello%20world%21

/* expected */
Hello world!
/**/

## One full encoded byte split #1
Hello%
20world

/* expected */
Hello world
/**/

## One full encoded byte split #2
Hello%2
0world

/* expected */
Hello world
/**/

## One full encoded byte (concat)
Hello%20
world

/* expected */
Hello world
/**/

## Malformed encoded byte #1
Hello%2Qworld

/* expected */
Hello%2Qworld
/**/

## Malformed encoded byte #2
Hello%world

/* expected */
Hello%world
/**/

## Plus to space
Hello+world

/* expected */
Hello world
/**/

## Plus and encoded byte
Hello+world%21

/* expected */
Hello world!
/**/

## Encoded plus
5%2B5%3D10

/* expected */
5+5=10
/**/

## Spaces and encoded plus
5+%2B+5+%3D+10

/* expected */
5 + 5 = 10
/**/