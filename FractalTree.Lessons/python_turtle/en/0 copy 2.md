# سلحفاة بايثون الاختبار 
ما هي السلحفاة؟

سلحفاة بايثون أو رسومات السلحفاة هي رسومات متجهة توفر تمثيلاً فيزيائياً باستخدام فهرس نسبي على المستوى الديكارتي. وهي ميزة أساسية في لغة البرمجة لوجو.


## Commands that utilize parameters
forward() - Moves the turtle forward a specified amount of units

backward() - Moves the turtle backward a specified amount of units

right() - Turns the turtle clockwise to a specific angle 

left() - Turns the turtle counterclockwise to a specific angle 

color() - Changes the color of the pen to a specified color (REQUIRES A STRING VALUE)

fillcolor() - Changes the color of the pen to fill a polygon to a specified color (REQUIRES A STRING VALUE)

goto() - Move the turtle to position (x,y)

speed() - Change the speed of the turtle using a specified number for the speed

NOTE: Negative values for parameters that are int or float values will function opposite the command

## Commands that do not utilize parameters
penup() or up() - Lift the pen up and do not create designs even when moving

pendown() or down() - Put the pen down and create deisgns even when moving

heading() - Return to the current heading

position() - Return to the current position


```python

from turtle import *

color("cyan")
forward(100)
left(120)
forward(100)
right(-300)
backward(100)
right(180)
color("red")
up()
right(60)
forward(50)
down()
forward(100)
right(120)
forward(100)
right(120)
forward(100)
up()
heading()
left(60)
forward(25)
left(90)
forward(120)
down()
color("yellow")
right(90)
forward(50)
right(120)
forward(100)
right(120)
forward(100)
right(120)
forward(50)


```



